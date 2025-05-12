from pathlib import Path

def get_version() -> str:
    # Try to get the version from the pyproject.toml file.
    # This is the default place to get the version of the project from
    try:
        root_dir = Path(__file__).parent.parent
        with open(root_dir / "pyproject.toml", 'r') as f:
            for line in f:
                if line.startswith("version ="):
                    return line.split("=")[1].strip().strip('"')
                
    except FileNotFoundError:
        pass


try:
    __version__ = get_version()
except Exception:
    __version__ = "unknown"
