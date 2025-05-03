#!/bin/bash

# Script to set up and push the Todo App to a GitHub repository

echo "=== Todo App Repository Setup ==="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "Error: git is not installed. Please install git and try again."
    exit 1
fi

# Initialize git if not already initialized
if [ ! -d .git ]; then
    echo "Initializing git repository..."
    git init
fi

# Ask for repository URL
echo "Please enter your GitHub repository URL (e.g., https://github.com/username/todo-app.git):"
read repo_url

if [ -z "$repo_url" ]; then
    echo "Error: Repository URL is required."
    exit 1
fi

# Set up remote
echo "Setting up remote repository..."
git remote remove origin 2>/dev/null
git remote add origin $repo_url

# Add all files
echo "Adding files to git..."
git add .

# Commit
echo "Committing files..."
echo "Please enter a commit message (default: 'Initial commit: Todo App'):"
read commit_message
commit_message=${commit_message:-"Initial commit: Todo App"}

git commit -m "$commit_message"

# Push
echo "Pushing to remote repository..."
echo "Please enter the branch name (default: main):"
read branch_name
branch_name=${branch_name:-"main"}

git push -u origin $branch_name

echo ""
echo "=== Repository Setup Complete ==="
echo "Your Todo App has been pushed to: $repo_url"
echo ""
echo "Don't forget to:"
echo "1. Take a screenshot of your app and save it as 'screenshot.png'"
echo "2. Update the repository URL in the README.md file"
echo ""
echo "Happy coding!"