"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Import the FormField interface from your react-form-engine package
import { FormField } from "@jonesstack/react-form-engine";

interface FormPreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    fields: FormField[];
    formName: string;
}

/**
 * A component to render an interactive preview of form fields.
 * These inputs are fully functional for testing the form.
 */
const SimplePreviewRenderer: React.FC<{ fields: FormField[] }> = ({ fields }) => {
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateField = (field: FormField, value: any): string | null => {
        // Required validation
        if (field.required && (!value || value.toString().trim() === '')) {
            return field.validation?.customMessage || `${field.label} is required`;
        }

        if (!value || value.toString().trim() === '') return null; // Skip other validations if empty

        // Min/Max length validation
        if (field.validation?.minLength && value.toString().length < field.validation.minLength) {
            return field.validation?.customMessage || `${field.label} must be at least ${field.validation.minLength} characters`;
        }

        if (field.validation?.maxLength && value.toString().length > field.validation.maxLength) {
            return field.validation?.customMessage || `${field.label} must be no more than ${field.validation.maxLength} characters`;
        }

        // Min/Max value validation for numbers
        if (field.type === 'number' && field.validation?.min !== undefined) {
            const numValue = parseFloat(value);
            if (isNaN(numValue) || numValue < field.validation.min) {
                return field.validation?.customMessage || `${field.label} must be at least ${field.validation.min}`;
            }
        }

        if (field.type === 'number' && field.validation?.max !== undefined) {
            const numValue = parseFloat(value);
            if (isNaN(numValue) || numValue > field.validation.max) {
                return field.validation?.customMessage || `${field.label} must be no more than ${field.validation.max}`;
            }
        }

        // Pattern validation
        if (field.validation?.pattern) {
            const regex = new RegExp(field.validation.pattern);
            if (!regex.test(value.toString())) {
                return field.validation?.customMessage || `${field.label} format is invalid`;
            }
        }

        return null;
    };

    const handleInputChange = (fieldId: string, value: any, field: FormField) => {
        const error = validateField(field, value);
        setErrors((prev: Record<string, string>) => ({
            ...prev,
            [fieldId]: error || ''
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data: Record<string, any> = {};
        const newErrors: Record<string, string> = {};

        // Validate all fields and collect data
        fields.forEach(field => {
            if (field.type === 'submit-button') return;

            const value = formData.get(field.id);
            const error = validateField(field, value);

            if (error) {
                newErrors[field.id] = error;
            }

            data[field.id] = value;
        });

        setErrors(newErrors);

        // Only submit if no errors
        if (Object.keys(newErrors).length === 0) {
            console.log('Form submitted with data:', data);
            alert('Form submitted successfully! Check console for data.');
        } else {
            alert('Please fix the validation errors before submitting.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md bg-gray-50 max-h-[60vh] overflow-y-auto">
            {fields.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No fields to preview yet. Add some in the builder!</p>
            ) : (
                fields.map((field) => {
                    const baseStyle = {
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
                            return (
                                <div key={field.id} className="mb-3">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {field.label} {field.required && <span className="text-red-500">*</span>}
                                    </label>
                                    <input
                                        type={field.type}
                                        name={field.id}
                                        placeholder={field.placeholder}
                                        className={`mt-1 block w-full rounded-md shadow-sm ${errors[field.id] ? 'border-red-500' : ''}`}
                                        style={baseStyle}
                                        onChange={(e) => handleInputChange(field.id, e.target.value, field)}
                                        minLength={field.validation?.minLength}
                                        maxLength={field.validation?.maxLength}
                                        min={field.validation?.min}
                                        max={field.validation?.max}
                                        pattern={field.validation?.pattern}
                                    />
                                    {errors[field.id] && (
                                        <p className="mt-1 text-sm text-red-600">{errors[field.id]}</p>
                                    )}
                                </div>
                            );
                        case 'textarea':
                            return (
                                <div key={field.id} className="mb-3">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {field.label} {field.required && <span className="text-red-500">*</span>}
                                    </label>
                                    <textarea
                                        name={field.id}
                                        placeholder={field.placeholder}
                                        rows={3}
                                        className={`mt-1 block w-full rounded-md shadow-sm ${errors[field.id] ? 'border-red-500' : ''}`}
                                        style={baseStyle}
                                        onChange={(e) => handleInputChange(field.id, e.target.value, field)}
                                        minLength={field.validation?.minLength}
                                        maxLength={field.validation?.maxLength}
                                    ></textarea>
                                    {errors[field.id] && (
                                        <p className="mt-1 text-sm text-red-600">{errors[field.id]}</p>
                                    )}
                                </div>
                            );
                        case 'select':
                            return (
                                <div key={field.id} className="mb-3">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {field.label} {field.required && <span className="text-red-500">*</span>}
                                    </label>
                                    <select
                                        name={field.id}
                                        className={`mt-1 block w-full rounded-md shadow-sm ${errors[field.id] ? 'border-red-500' : ''}`}
                                        style={baseStyle}
                                        onChange={(e) => handleInputChange(field.id, e.target.value, field)}
                                    >
                                        <option value="">{field.placeholder || "Select an option"}</option>
                                        {field.options?.map((option, idx) => (
                                            <option key={idx} value={option}>{option}</option>
                                        ))}
                                    </select>
                                    {errors[field.id] && (
                                        <p className="mt-1 text-sm text-red-600">{errors[field.id]}</p>
                                    )}
                                </div>
                            );
                        case 'checkbox':
                            return (
                                <div key={field.id} className="mb-3 flex items-center">
                                    <input
                                        type="checkbox"
                                        name={field.id}
                                        className={`h-4 w-4 text-blue-600 border-gray-300 rounded ${errors[field.id] ? 'border-red-500' : ''}`}
                                        onChange={(e) => handleInputChange(field.id, e.target.checked, field)}
                                    />
                                    <label className="ml-2 block text-sm text-gray-900">{field.label}</label>
                                    {errors[field.id] && (
                                        <p className="mt-1 text-sm text-red-600">{errors[field.id]}</p>
                                    )}
                                </div>
                            );
                        case 'radio':
                            return (
                                <div key={field.id} className="mb-3">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {field.label} {field.required && <span className="text-red-500">*</span>}
                                    </label>
                                    <div className="space-y-2">
                                        {field.options?.map((option, idx) => (
                                            <div key={idx} className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name={field.id}
                                                    value={option}
                                                    className={`h-4 w-4 text-blue-600 border-gray-300 ${errors[field.id] ? 'border-red-500' : ''}`}
                                                    onChange={(e) => handleInputChange(field.id, e.target.value, field)}
                                                />
                                                <label className="ml-2 block text-sm text-gray-900">{option}</label>
                                            </div>
                                        ))}
                                    </div>
                                    {errors[field.id] && (
                                        <p className="mt-1 text-sm text-red-600">{errors[field.id]}</p>
                                    )}
                                </div>
                            );
                        case 'submit-button':
                            return (
                                <button
                                    key={field.id}
                                    type="submit" // Now it's a real submit button
                                    className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md"
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
                                <div key={field.id} className="mb-3">
                                    <p className="text-sm text-gray-500">Unsupported field type for preview: {field.type}</p>
                                </div>
                            );
                    }
                })
            )}
        </form>
    );
};


const FormPreviewModal: React.FC<FormPreviewModalProps> = ({ isOpen, onClose, fields, formName }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Form Preview: {formName}</DialogTitle>
                </DialogHeader>
                <div className="flex-1 overflow-hidden">
                    <SimplePreviewRenderer fields={fields} />
                </div>
                <div className="flex justify-end pt-4">
                    <Button onClick={onClose}>Close</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default FormPreviewModal;