import tomllib
from enum import Enum
from importlib.resources import files

import typer

app = typer.Typer(help="Typed image website tool")


@app.command()
def add():
    """Add assets to website"""
    print(f"add")


@app.command()
def remove():
    """Remove assets from website"""
    print(f"remove")


@app.command()
def list():
    """List assets in website"""
    print(f"list")


@app.command()
def init(label: str):
    """Initialise a website directory"""
    print(f"create: {label}")
    for item in files("typedimages.app").iterdir():
        print(item)
        if item.is_dir():
            for subitem in item.iterdir():
                print(subitem)


if __name__ == "__main__":
    app()
