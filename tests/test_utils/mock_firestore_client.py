from google.cloud.firestore_v1 import FieldFilter


class MockDocumentSnapshot:
    def __init__(self, id, data):
        self.id = id
        self._data = data

    def to_dict(self):
        return self._data


class MockFirestoreClient:
    def __init__(self):
        self._collections = {}
        self._current_collection = None
        self._current_documents = {}  # Tracks the current document ID for each collection

    def collection(self, collection_name):
        self._current_collection = collection_name
        if collection_name not in self._current_documents:
            self._current_documents[collection_name] = {"current_document": None, "current_document_id": None}
        return self

    def document(self, document_name):
        if self._current_collection:
            self._current_documents[self._current_collection]["current_document"] = document_name
        return self

    def get(self):
        return self

    @property
    def exists(self):
        collection = self._collections.get(self._current_collection, {})
        current_doc = self._current_documents.get(self._current_collection, {}).get("current_document")
        return current_doc in collection

    def set(self, data: dict):
        collection = self._current_collection
        current_doc = self._current_documents[collection]["current_document"]
        self._collections.setdefault(collection, {})[current_doc] = data

    def to_dict(self):
        collection = self._collections.get(self._current_collection, {})
        current_doc = self._current_documents.get(self._current_collection, {}).get("current_document")
        return collection.get(current_doc, {})

    def setup_mock_data(self, collection_name, document_name, data, doc_id=None):
        self._current_collection = collection_name
        if collection_name not in self._current_documents:
            self._current_documents[collection_name] = {}
        self._current_documents[collection_name]["current_document"] = document_name
        self._current_documents[collection_name]["current_document_id"] = doc_id
        self.set(data)

    def where(self, filter: FieldFilter):
        # Extract field, op, and value from the FieldFilter object
        self._where_field = filter.field_path
        self._where_op = filter.op_string
        self._where_value = filter.value
        return self

    def stream(self):
        matching_docs = []
        for doc_id, doc in self._collections.get(self._current_collection, {}).items():
            if doc.get(self._where_field) == self._where_value:
                matching_docs.append(MockDocumentSnapshot(doc_id, doc))
        return matching_docs

    def add(self, data) -> list:
        # This method should add a new document to the collection
        # and return a list with the new document.
        collection = self._current_collection
        current_doc_id = self._current_documents[collection].get("current_document_id")
        self.set(data)
        return [[], MockDocumentSnapshot(current_doc_id, data)]