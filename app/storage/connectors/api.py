"""
API of the db connector
it describes the operations allowed
independent of kind of DB used
"""

from abc import ABC, abstractmethod
from typing import List, Protocol


class SaveError(Exception):
    pass


class DBConnector(ABC):
    """
    Basic interface to a DB engine every connector must implement.
    There would be one per resource.
    Instantiate with params:
    db uri or path
    """

    # Note: Normally I would implement it as a Context manager
    # Need to investigate FastAPI/uvunicorn more deeply
    @abstractmethod
    async def connect(self) -> None:
        """
        Connect to the DB
        """
        ...

    @abstractmethod
    async def disconnect(self) -> None:
        """
        Close the connection if needed, tidy up
        """
        ...

    @abstractmethod
    async def add(self, resource) -> dict:
        """
        Add the resource to the DB
        Params
         resource = the resource itself
        Return:
         the newly added resource
        """
        ...

    @abstractmethod
    async def read_many(self, criteria: dict, how_many: int, offset: int):
        """
        Read the resources from the DB according to
         the given criteria 
         how many to retrieve
         from a certain offset
        Return:
         the desired list of resources
        """
        ...


# Another way, maybe nicer/more modern way would be:
#
# from typing import Protocol, ContextManager, runtime_checkable
#
#
# @runtime_checkable
# class DBConnector(Protocol):
#     """
#     Basic interface to a DB engine every connector must implement.
#     There would be one per resource.
#     Instantiate with params:
#     db uri or path
#     """

#     # Note: Normally I would implement it as a Context manager
#     # Need to investigate FastAPI/uvunicorn more deeply
#     async def connect(self) -> None:
#         """
#         Connect to the DB
#         """
#         ...

#     async def disconnect(self) -> None:
#         """
#         Close the connection if needed, tidy up
#         """
#         ...

#     async def add(self, resource) -> dict:
#         """
#         Add the resource to the DB
#         Params
#          resource = the resource itself
#         Return:
#          the newly added resource
#         """
#         ...

#     async def read_many(self, criteria: dict, how_many: int, offset: int):
#         """
#         Read the resources from the DB according to
#          the given criteria 
#          how many to retrieve
#          from a certain offset
#         Return:
#          the desired list of resources
#         """
#         ...

#
#
# def implements(proto: Type):
#     """ Creates a decorator for classes that checks that the decorated class
#     implements the runtime protocol `proto`
#     """
#     def _deco(cls_def):
#         try:
#             assert issubclass(cls_def, proto)
#         except AssertionError as e:
#             e.args = (f"{cls_def} does not implement protocol {proto}",)
#             raise
#         return cls_def
#     return _deco
