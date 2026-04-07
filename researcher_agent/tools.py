# tools.py
from langchain_community.tools import DuckDuckGoSearchResults
from langchain_core.tools import tool
import requests
from bs4 import BeautifulSoup

search_tool = DuckDuckGoSearchResults()

@tool
def scrape_webpage(url: str) -> str:
    """Scrapes the text content of a webpage to look for map data."""
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    return soup.get_text()[:2000]

tools = [search_tool, scrape_webpage]
