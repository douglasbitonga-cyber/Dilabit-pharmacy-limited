# Security Checklist

Before production deployment, verify:

- [ ] Change default owner PIN
- [ ] Generate strong JWT_SECRET (32+ characters)
- [ ] Change PostgreSQL password
- [ ] Enable firewall (UFW)
- [ ] Use HTTPS only (no HTTP)
- [ ] Configure real M-Pesa credentials (not sandbox)
- [ ] Enable automated backups
- [ ] Test backup restore
- [ ] Monitor logs regularly
- [ ] Keep Node.js and PostgreSQL updated
- [ ] Restrict database access
- [ ] Implement audit logging
- [ ] Review user permissions
- [ ] Test recovery procedures
- [ ] Document incident response plan

## Compliance Notes

This is a business management tool, not a regulated medical system. Before live pharmacy use:

1. Verify local pharmacy regulations
2. Implement required audit trails
3. Add customer record security
4. Implement payment reconciliation
5. Test backup/restore thoroughly
6. Train staff on security
7. Establish incident procedures
