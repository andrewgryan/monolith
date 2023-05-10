from pydantic import BaseModel


class Image(BaseModel):
    src: str
    author: str
