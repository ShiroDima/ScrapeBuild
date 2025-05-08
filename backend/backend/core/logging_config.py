import logging
import os
import sys


from backend.core.settings import app_settings


def addLoggingLevel(level_name: str, level_num: int, method_name: str | None = None) -> None:
    """
    Adds a new logging level to the `logging` module and the currently configured logging class.

    
    `level_name` becomes an attribute of the `logging` module with the value `level_num`.
    `method_name` becomes a convenience method for both `logging` itself and the class returned by `logging.getLoggerClass()`.
    If `method_name` is not specified `level_name.lower()` is used.

    To avoid accidental clobberings of existing attributes, this method will
	raise an `AttributeError` if the level name is already an attribute of the
	`logging` module or if the method name is already present

	Example
	-------
	>>> addLoggingLevel('TRACE', logging.DEBUG - 5)
	>>> logging.getLogger(__name__).setLevel('TRACE')
	>>> logging.getLogger(__name__).trace('that worked')
	>>> logging.trace('so did this')
	>>> logging.TRACE
	5
    """

    if not method_name:
        method_name = level_name.lower()
        
    if hasattr(logging, level_name):
        raise AttributeError(f"{level_name} is already defined in logging module")
    if hasattr(logging, method_name):
        raise AttributeError(f"{method_name} is already defined in logging module")
    if hasattr(logging.getLoggerClass(), method_name):
        raise AttributeError(f"{method_name} is already defined in logging class")

    def logForLevel(self, message, *args, **kwargs):
        if self.isEnabledFor(level_num):
            self._log(level_num, message, args, **kwargs)
    
    def logToRoot(message, *args, **kwargs):
        logging.log(level_num, message, *args, **kwargs)

    logging.addLevelName(level_num, level_name)
    setattr(logging, level_num, level_num)
    setattr(logging.getLoggerClass(), method_name, logForLevel)
    setattr(logging, method_name, logToRoot)



def setup_logging():
    # try to add a RESULT level
    try:
        addLoggingLevel('RESULT', 35)
    except AttributeError:
        pass

    log_type = app_settings.browser_settings.BROWSER_USE_LOG_LEVEL.lower()

    # check if the logging handlers have already been setup
    if logging.getLogger().hasHandlers():
        return
    
    # clear existing handlers
    root = logging.getLogger()
    root.handlers = []

    

