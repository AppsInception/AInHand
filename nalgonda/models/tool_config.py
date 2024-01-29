from pydantic import BaseModel, Field


class ToolConfig(BaseModel):
    """Tool configuration model"""

    tool_id: str | None = Field(None, description="Unique identifier for the configuration")
    owner_id: str | None = Field(None, description="The user ID owning this configuration")
    name: str = Field(..., description="Name of the tool")
    description: str = Field("", description="Description of the tool")
    version: int = Field(1, description="Version of the tool configuration")
    code: str = Field("", description="The actual code of the tool")
    approved: bool | None = Field(None, description="Approval status of the tool configuration")

    def increment_version(self):
        """Increment the tool's version."""
        self.version += 1