#!/usr/bin/env python3
"""
Simple helper function
"""


def index_range(page, page_size):
    """
    Return a tuple of size two containing a start index and an end index
    corresponding to the range of indexes to return in a list for those
    particular pagination parameters.
    
    Args:
        page (int): Page number (1-indexed)
        page_size (int): Number of items per page
        
    Returns:
        tuple: A tuple containing start index and end index
    """

    start_index = (page - 1) * page_size
    end_index = start_index + page_size

    return (start_index, end_index)
