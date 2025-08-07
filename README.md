# @jonesstack/react-form-engine

A dynamic, schema-based form rendering engine for React applications. Design forms visually using the FormCarve builder, export the JSON schema, and render them with full validation support.

![FormCarve Builder Interface](https://github.com/allenarduino/formcarve/blob/main/demo-screenshots/demo-screenshot1.png)

*The FormCarve Builder provides an intuitive drag-and-drop interface for creating forms with real-time preview, validation rules, and styling options.*

## Features

- **Schema-driven forms** - Define forms using JSON schemas
- **Built-in validation** - Comprehensive validation system with custom messages
- **Customizable styling** - Style your forms with custom CSS properties
- **Responsive design** - Works on all screen sizes
- **TypeScript support** - Full TypeScript definitions included
- **Multiple field types** - Text, email, textarea, select, checkbox, radio, number, date, phone, URL
- **Lightweight** - No heavy dependencies

## Installation

```bash
npm install @jonesstack/react-form-engine
# or
yarn add @jonesstack/react-form-engine
# or
pnpm add @jonesstack/react-form-engine
```

## Quick Start

### Step 1: Design Your Form
Use the [FormCarve Builder](https://formcarve.co) to visually design your form:
- Drag and drop form fields
- Configure validation rules
- Customize styling
- Preview your form in real-time

### Step 2: Export the JSON Schema
Click "Export JSON" in the builder to download your form schema.

### Step 3: Use in Your React App
```tsx
import { FormRenderer } from '@jonesstack/react-form-engine';

// Paste your exported JSON schema here
const formSchema = {
  "formName": "User Registration",
  "formFields": [
    {
      "id": "email",
      "type": "email",
      "label": "Email Address",
      "placeholder": "Enter your email",
      "required": true,
      "validation": {
        "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
        "customMessage": "Please enter a valid email address"
      }
    },
    {
      "id": "password",
      "type": "text",
      "label": "Password",
      "placeholder": "Enter your password",
      "required": true,
      "validation": {
        "minLength": 8,
        "maxLength": 50,
        "pattern": "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$",
        "customMessage": "Password must be 8-50 characters with uppercase, lowercase, and number"
      }
    },
    {
      "id": "age",
      "type": "number",
      "label": "Age",
      "required": true,
      "validation": {
        "min": 18,
        "max": 100,
        "customMessage": "Age must be between 18 and 100"
      }
    },
    {
      "id": "submit",
      "type": "submit-button",
      "label": "Register",
      "required": false
    }
  ]
};

function MyForm() {
  const handleSubmit = (data: Record<string, any>) => {
    console.log('Form data:', data);
    // Handle form submission
  };

  return <FormRenderer schema={formSchema} onSubmit={handleSubmit} />;
}
```

## Workflow

1. **Design**: Use the FormCarve Builder to create your form visually
2. **Export**: Download the JSON schema from the builder
3. **Integrate**: Use the `FormRenderer` component in your React app
4. **Deploy**: Your form is ready with full validation and styling

## API Reference

### FormField Interface

The exported JSON schema follows this structure:

```typescript
interface FormField {
  id: string;
  type: string; // 'text', 'email', 'textarea', 'select', 'checkbox', 'radio', 'submit-button', 'number', 'date', 'phone', 'url'
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[]; // For 'select', 'radio' types
  validation?: {
    minLength?: number;
    maxLength?: number;
    min?: number; // For number fields
    max?: number; // For number fields
    pattern?: string; // Regex pattern
    customMessage?: string; // Custom error message
  };
  styling?: {
    borderRadius?: number;
    backgroundColor?: string;
    borderColor?: string;
    textColor?: string;
    fontSize?: number;
    padding?: number;
  };
}
```

### FormRenderer Props

```typescript
interface FormRendererProps {
  schema: {
    formName: string;
    formFields: FormField[];
  };
  onSubmit: (data: Record<string, any>) => void;
  className?: string; // Optional CSS class for the form container
}
```

## Field Types

### Text Inputs
- `text` - Single line text input
- `email` - Email input with validation
- `number` - Numeric input
- `phone` - Phone number input
- `url` - URL input
- `date` - Date picker

### Multi-line
- `textarea` - Multi-line text input

### Selection
- `select` - Dropdown selection
- `checkbox` - Single checkbox
- `radio` - Radio button group

### Action
- `submit-button` - Form submission button

## Validation

The form engine supports comprehensive validation:

### Required Fields
```typescript
{
  id: "name",
  type: "text",
  label: "Name",
  required: true
}
```

### Length Validation
```typescript
{
  id: "description",
  type: "textarea",
  label: "Description",
  validation: {
    minLength: 10,
    maxLength: 500
  }
}
```

### Numeric Range
```typescript
{
  id: "age",
  type: "number",
  label: "Age",
  validation: {
    min: 18,
    max: 100
  }
}
```

### Pattern Validation
```typescript
{
  id: "email",
  type: "email",
  label: "Email",
  validation: {
    pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
    customMessage: "Please enter a valid email address"
  }
}
```

## Styling

Customize the appearance of your forms:

```typescript
{
  id: "custom-field",
  type: "text",
  label: "Custom Styled Field",
  styling: {
    borderRadius: 8,
    backgroundColor: "#f8f9fa",
    borderColor: "#007bff",
    textColor: "#212529",
    fontSize: 16,
    padding: 12
  }
}
```

## Examples

### Contact Form (Exported from Builder)
```json
{
  "formName": "Contact Us",
  "formFields": [
    {
      "id": "name",
      "type": "text",
      "label": "Full Name",
      "required": true,
      "validation": {
        "minLength": 2,
        "maxLength": 50
      }
    },
    {
      "id": "email",
      "type": "email",
      "label": "Email",
      "required": true,
      "validation": {
        "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
      }
    },
    {
      "id": "message",
      "type": "textarea",
      "label": "Message",
      "required": true,
      "validation": {
        "minLength": 10,
        "maxLength": 1000
      }
    },
    {
      "id": "submit",
      "type": "submit-button",
      "label": "Send Message"
    }
  ]
}
```

### Survey Form (Exported from Builder)
```json
{
  "formName": "Customer Survey",
  "formFields": [
    {
      "id": "satisfaction",
      "type": "radio",
      "label": "How satisfied are you?",
      "required": true,
      "options": ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"]
    },
    {
      "id": "features",
      "type": "checkbox",
      "label": "Which features do you use?",
      "options": ["Feature A", "Feature B", "Feature C", "Feature D"]
    },
    {
      "id": "feedback",
      "type": "textarea",
      "label": "Additional Feedback",
      "validation": {
        "maxLength": 500
      }
    },
    {
      "id": "submit",
      "type": "submit-button",
      "label": "Submit Survey"
    }
  ]
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © Allen Jones 
