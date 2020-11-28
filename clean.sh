#!/bin/zsh/sh

# Punctuation Cleanser
sed s/{//g copy.txt > 1.txt
sed s/://g 1.txt > 2.txt
sed s/,//g 2.txt > 3.txt
sed s/-//g 3.txt > 4.txt
sed s/}//g 4.txt > 5.txt


