
import React from 'react';

/**
 * Defines the structure of a single form field within the FormCarve schema.
 */
export interface FormField {
    id: string;
    type: string; // e.g., 'text', 'email', 'textarea', 'select', 'checkbox', 'radio', 'submit-button', 'number', 'date', 'phone', 'url', 'address', 'credit-card'
    label: string;
    placeholder?: string; // Optional text hint for input fields
    required: boolean; // Is this field mandatory?
    options?: string[]; // For 'select', 'radio', 'checkbox' types (e.g., ["Option A", "Option B"])
    validation?: {
        minLength?: number; // Minimum length for text/number inputs
        maxLength?: number; // Maximum length for text/number inputs
        min?: number; // Minimum value for number inputs
        max?: number; // Maximum value for number inputs
        pattern?: string; // Regex pattern for validation (e.g., for email)
        customMessage?: string; // Custom error message
        email?: boolean; // Email validation
        url?: boolean; // URL validation
        phone?: boolean; // Phone validation
        required?: boolean; // Required field validation (redundant with field.required but more explicit)
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


interface FormRendererProps {
    schema: {
        formName: string;
        formFields: FormField[];
    };
    // onSubmit receives an object where keys are field IDs and values are their entered data.
    onSubmit: (data: Record<string, any>) => void;
    className?: string; // Optional className for the form container
}

/**
 * FormRenderer component that dynamically renders a form based on a JSON schema.
 */
export const FormRenderer: React.FC<FormRendererProps> = ({ schema, onSubmit, className }) => {
    const formRef = React.useRef<HTMLFormElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;

        const formData: Record<string, any> = {};
        const formElements = formRef.current.elements;

        schema.formFields.forEach(field => {
            if (field.type === 'submit-button') return; // Skip submit button itself

            const element = formElements.namedItem(field.id);

            if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement) {
                formData[field.id] = element.value;
            } else if (field.type === 'checkbox') {
                const checkbox = element as HTMLInputElement;
                formData[field.id] = checkbox.checked;
            } else if (field.type === 'radio') {
                const radioGroup = formRef.current!.querySelectorAll(`input[name="${field.id}"]:checked`);
                if (radioGroup.length > 0) {
                    formData[field.id] = (radioGroup[0] as HTMLInputElement).value;
                } else {
                    formData[field.id] = undefined; // Or null, depending on unselected radios are handled
                }
            }

        });

        onSubmit(formData);
    };

    return (
        <form ref={formRef} onSubmit={handleSubmit} className={`p-4 border rounded-lg shadow-md space-y-4 ${className || ''}`}>
            <h2 className="text-2xl font-bold mb-4">{schema.formName || "Dynamic Form"}</h2>

            {schema.formFields.length === 0 && (
                <p className="text-gray-500 text-center py-8">No fields defined in this form schema.</p>
            )}

            {schema.formFields.map(field => {
                const inputClasses = "mt-1 block w-full rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50";
                const labelClasses = "block text-sm font-medium text-gray-700 mb-1";

                const customStyle = {
                    borderRadius: field.styling?.borderRadius || 6,
                    backgroundColor: field.styling?.backgroundColor || '#ffffff',
                    border: `1px solid ${field.styling?.borderColor || '#d1d5db'}`,
                    color: field.styling?.textColor || '#000000',
                    fontSize: field.styling?.fontSize || 14,
                    padding: field.styling?.padding || 12,
                };

                switch (field.type) {
                    case 'text':
                    case 'email':
                    case 'number':
                    case 'phone':
                    case 'url':
                    case 'date': // Basic date input
                        return (
                            <div key={field.id}>
                                <label htmlFor={field.id} className={labelClasses}>
                                    {field.label} {field.required && <span className="text-red-500">*</span>}
                                </label>
                                <input
                                    id={field.id}
                                    name={field.id} // Essential for form submission data
                                    type={field.type === 'phone' ? 'tel' : field.type === 'url' ? 'url' : field.type === 'date' ? 'date' : field.type}
                                    placeholder={field.placeholder}
                                    required={field.required}
                                    minLength={field.validation?.minLength}
                                    maxLength={field.validation?.maxLength}
                                    pattern={field.validation?.pattern}
                                    className={inputClasses}
                                    style={customStyle}
                                />
                            </div>
                        );
                    case 'textarea':
                        return (
                            <div key={field.id}>
                                <label htmlFor={field.id} className={labelClasses}>
                                    {field.label} {field.required && <span className="text-red-500">*</span>}
                                </label>
                                <textarea
                                    id={field.id}
                                    name={field.id} // Essential for form submission data
                                    placeholder={field.placeholder}
                                    required={field.required}
                                    rows={3}
                                    className={inputClasses}
                                    style={customStyle}
                                ></textarea>
                            </div>
                        );
                    case 'select':
                        return (
                            <div key={field.id}>
                                <label htmlFor={field.id} className={labelClasses}>
                                    {field.label} {field.required && <span className="text-red-500">*</span>}
                                </label>
                                <select
                                    id={field.id}
                                    name={field.id} // Essential for form submission data
                                    required={field.required}
                                    className={inputClasses}
                                    style={customStyle}
                                >
                                    <option value="">{field.placeholder || "Select an option"}</option>
                                    {field.options?.map((option, idx) => (
                                        <option key={idx} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                        );
                    case 'checkbox':
                        return (
                            <div key={field.id} className="flex items-center">
                                <input
                                    id={field.id}
                                    name={field.id} // Essential for form submission data
                                    type="checkbox"
                                    required={field.required}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label htmlFor={field.id} className="ml-2 block text-sm text-gray-900">
                                    {field.label} {field.required && <span className="text-red-500">*</span>}
                                </label>
                            </div>
                        );
                    case 'radio':
                        return (
                            <div key={field.id}>
                                <label className={labelClasses}>
                                    {field.label} {field.required && <span className="text-red-500">*</span>}
                                </label>
                                <div className="mt-2 space-y-2">
                                    {field.options?.map((option, idx) => (
                                        <div key={idx} className="flex items-center">
                                            <input
                                                id={`${field.id}-${idx}`}
                                                name={field.id} // Crucial: all radios in a group must have the same 'name'
                                                type="radio"
                                                value={option}
                                                required={field.required}
                                                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                            />
                                            <label htmlFor={`${field.id}-${idx}`} className="ml-2 block text-sm text-gray-900">
                                                {option}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    case 'submit-button':
                        return (
                            <button
                                key={field.id}
                                type="submit"
                                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                style={{
                                    borderRadius: field.styling?.borderRadius || 6,
                                    backgroundColor: field.styling?.backgroundColor || '#3b82f6',
                                    borderColor: field.styling?.borderColor || '#3b82f6',
                                    color: field.styling?.textColor || '#ffffff',
                                    fontSize: field.styling?.fontSize || 16,
                                    padding: field.styling?.padding || 12,
                                }}
                            >
                                {field.label}
                            </button>
                        );
                    default:
                        return (
                            <div key={field.id}>
                                <p className="text-red-500 text-sm">Unsupported field type: {field.type}</p>
                            </div>
                        );
                }
            })}
        </form>
    );
};