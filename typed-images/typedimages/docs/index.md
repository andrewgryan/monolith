# Welcome to MkDocs

For full documentation visit [mkdocs.org](https://www.mkdocs.org).

## Commands

* `mkdocs new [dir-name]` - Create a new project.
* `mkdocs serve` - Start the live-reloading docs server.
* `mkdocs build` - Build the documentation site.
* `mkdocs -h` - Print help message and exit.

## Diagrams


``` mermaid
erDiagram
    SCIENTIST ||--|| SITE: creates
    SCIENTIST ||--|| PNG: annotates
    SCIENTIST ||--|| SITE: updates
    SITE ||--|| PNG: references
```



## Project layout

    mkdocs.yml    # The configuration file.
    docs/
        index.md  # The documentation homepage.
        ...       # Other markdown pages, images and other files.
