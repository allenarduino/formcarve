import React from 'react';

/**
 * Defines the structure of a single form field within the FormCarve schema.
 */
export interface FormField {
    id: string;
    type: string; // e.g., 'text', 'email', 'textarea', 'select', 'checkbox', 'radio', 'submit-button'
    label: string;
    placeholder?: string; // Optional text hint for input fields
    required: boolean; // Is this field mandatory?
    options?: string[]; // For 'select', 'radio', 'checkbox' types (e.g., ["Option A", "Option B"])
    validation?: {
        minLength?: number; // Minimum length for text/number inputs
        maxLength?: number; // Maximum length for text/number inputs
        pattern?: string;   // Regex pattern for validation
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

/**
 * Placeholder for the FormRenderer component.
 * This will be fully implemented later to render forms based on a JSON schema.
 */
interface FormRendererProps {
    schema: {
        formName: string;
        formFields: FormField[];
    };
    onSubmit: (data: Record<string, any>) => void; // Callback for form submission
}

export const FormRenderer: React.FC<FormRendererProps> = ({ schema, onSubmit }) => {
    // This is a minimal placeholder.
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted (FormRenderer placeholder)");
        onSubmit({}); // Call onSubmit with empty data for now
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-md space-y-4">
            <h2 className="text-2xl font-bold mb-4">{schema.formName || "Dynamic Form"}</h2>
            {schema.formFields.length === 0 ? (
                <p className="text-gray-500">No fields in this schema yet.</p>
            ) : (
                schema.formFields.map(field => (
                    <div key={field.id} className="mb-2">
                        <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                        {/* Render a basic input or text for each field for now */}
                        {field.type === 'submit-button' ? (
                            <button
                                type="submit"
                                style={{
                                    backgroundColor: field.styling?.backgroundColor || 'blue',
                                    color: field.styling?.textColor || 'white',
                                    padding: 10,
                                    borderRadius: 5
                                }}
                            >
                                {field.label}
                            </button>
                        ) : (
                            <input
                                type="text"
                                placeholder={field.placeholder || field.type}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                disabled
                            />
                        )}
                    </div>
                ))
            )}
        </form>
    );
};