# Security Specification - Amani Interiors

## Data Invariants
1. A lead must have a valid name, email, and message.
2. A lead's timestamp must match the request time.
3. A booking must have a valid date, time, and service ID.
4. Booking status must initially be 'pending'.
5. Portfolio items are read-only for public users.

## The "Dirty Dozen" Payloads (Rejected)
1. Lead with no email.
2. Lead with invalid email format.
3. Lead with message > 5000 characters (Denial of Wallet).
4. Lead with forged `createdAt` timestamp.
5. Booking with forged `status: 'confirmed'`.
6. Booking with invalid date string.
7. Booking with budget field as a number instead of string.
8. Updating a lead after creation.
9. Deleting a lead by non-admin.
10. Creating a portfolio item by non-admin.
11. Reading the entire `leads` collection by public user.
12. Injecting a 1MB string into the `name` field.

## Hardened Patterns
- `isValidId()` for all IDs.
- `isValidLead()` and `isValidBooking()` helpers.
- Exact key matching on creation (`size() == count`).
- `request.time` for all timestamps.
