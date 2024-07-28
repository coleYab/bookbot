#!/usr/bin/env python3
"""
main.py - reading the contents of the book and prints it.
"""


def count_chars(text: str) -> dict:
    """
    count_chars - count all the characters that are in the text.
    """
    char_count = {}

    for char in text.lower():
        if char not in char_count:
            char_count[char] = 1
        else:
            char_count[char] += 1

    return char_count


def visualize_book(book_path, word_count, sorted_char_dict):
    print(f"-- Begin report of {book_path} --")
    print(f"{word_count} words found in the document")
    print("")

    for k, v in sorted_char_dict.items():
        print(f"The '{k}' character was found {v} times")

    print("--- End report ---")

def main(path_to_file):
    try:
        with open(path_to_file) as file:
            contents = file.read()
            words = contents.split()
            sorted_dict = dict(sorted(count_chars(contents).items(), key=lambda item: item[1], reverse=True))
            sorted_char_dict = {k: v for k, v in sorted_dict.items() if k.isalpha() == True}
            visualize_book(path_to_file, len(words), sorted_char_dict)
    except Exception as e:
        print(e)


if __name__ == '__main__':
    main('books/frankenstein.txt')
