### Feature 3: Basic Form Fields

- **Then** I can enter my name, age, email, gender, and accept Terms and Conditions
- **And** all fields are properly labeled with connected labels (using `htmlFor`)

### Feature 4: Advanced Form Fields

- **Then** I can upload an image (validated for type and size, converted to base64)
- **And** I can set passwords with strength indicator
- **And** I can select a country from an autocomplete control

### Feature 5: Form Validation

- **Then** validation errors are displayed consistently
- **And** validation uses Zod schema
- **And** the React Hook Form submit button is disabled when there are errors (live validation)
- **And** the uncontrolled form validates only on submit

**Validation Rules:**

- Name: first letter must be uppercase
- Age: must be a number, no negative values
- Email: basic email validation (one @, non-empty local part, domain with at least one dot, no regex)
- Passwords: must match
- Image: validate size and extension (png, jpeg)
- Country: must exist in the stored countries list

### Feature 6: Form Submission and Display (**10 points**)

- **When** I submit the form
- **Then** the modal closes
- **And** the form data is displayed on the main page
- **And** newly submitted data is visually indicated (e.g., different border or background color for a few seconds)

### Feature 7: Test Coverage (**5 points**)

- Form components are tested (rendering, validation, submission).
- Modal components are tested (opening/closing, accessibility, portal rendering).
- State management is tested (actions, reducers, selectors).
- Utility functions are tested (password strength, image conversion, validation helpers).
