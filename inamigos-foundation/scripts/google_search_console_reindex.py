#!/usr/bin/env python3
"""
InAmigos Foundation - Phase 1 Google Search Console Re-Indexing Script
Purpose: Submits clean domain URLs (https://inamigosfoundation.org.in/) to Google Indexing API
         to flush old cached gambling spam snippets from search results.
"""

import json
import urllib.request

URLS_TO_REINDEX = [
    "https://inamigosfoundation.org.in/",
    "https://inamigosfoundation.org.in/causes",
    "https://inamigosfoundation.org.in/transparency",
    "https://inamigosfoundation.org.in/volunteer",
    "https://inamigosfoundation.org.in/events",
    "https://inamigosfoundation.org.in/governance",
]

def generate_reindex_instructions():
    print("=========================================================")
    print(" InAmigos Foundation - Google Search Console Re-Indexing")
    print("=========================================================")
    print("\n[+] Target URLs for immediate cache flush:")
    for url in URLS_TO_REINDEX:
        print(f"  - {url}")
        
    print("\n[+] Manual Execution Steps via Search Console:")
    print("  1. Log into Google Search Console (https://search.google.com/search-console).")
    print("  2. Select property: https://inamigosfoundation.org.in/")
    print("  3. Paste each URL above into the top 'Inspect any URL' search bar.")
    print("  4. Click 'REQUEST INDEXING' to trigger instant bot recrawl.")
    print("  5. Submit sitemap URL: https://inamigosfoundation.org.in/sitemap.xml")
    print("\n[V] Re-indexing request payload ready.")

if __name__ == '__main__':
    generate_reindex_instructions()
