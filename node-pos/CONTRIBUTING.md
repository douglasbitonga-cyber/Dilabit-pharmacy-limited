# Contributing to Dilabit Pharmacy POS

## Getting Started

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Make changes
4. Commit: `git commit -m 'Add feature'`
5. Push: `git push origin feature/your-feature`
6. Create a Pull Request

## Code Style

- Use 2-space indentation
- Use `const`/`let`, avoid `var`
- Add comments for complex logic
- Run `npm lint` before committing

## Testing

Before PR:

```bash
npm run migrate
npm start
# Test locally
```

## Issues

Describe clearly:

- What happened
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment (OS, Node version, etc.)
