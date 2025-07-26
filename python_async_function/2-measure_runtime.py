#!/usr/bin/env python3
"""
Module that defines a function to measure the average runtime of
running wait_n(n, max_delay) concurrently.
"""
import time
import asyncio

wait_n = __import__('1-concurrent_coroutines').wait_n


def measure_time(n: int, max_delay: int) -> float:
    """
    Measure the average execution time of wait_n with n tasks and
    the given max_delay, and return the average delay per task.
    """
    start: float = time.time()
    asyncio.run(wait_n(n, max_delay))
    end: float = time.time()
    total_time: float = end - start
    return total_time / n
