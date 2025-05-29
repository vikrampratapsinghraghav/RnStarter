# Contributing to RnStarter

Thank you for your interest in contributing to RnStarter! This document provides guidelines and instructions for contributing.

## Development Setup

1. Fork and clone the repository
2. Install dependencies: `yarn install`
3. Install iOS pods: `cd ios && pod install`
4. Copy `.env.example` to `.env` and update values
5. Start the development server: `yarn start`

## Code Style

- Follow the existing code style
- Use TypeScript for all new files
- Add JSDoc comments to functions and components
- Use meaningful variable and function names
- Keep components small and focused

## Pull Request Process

1. Create a feature branch
2. Make your changes
3. Update documentation if needed
4. Run tests: `yarn test`
5. Submit a pull request

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Code style changes
- refactor: Code refactoring
- test: Test changes
- chore: Build process or auxiliary tool changes

## Documentation

- Update README.md if adding new features
- Add JSDoc comments to new functions
- Update .env.example if adding new environment variables
- Create or update component documentation

## Questions?

Feel free to open an issue for any questions or concerns. 