"use client";

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
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data: Record<string, any> = {};

        // Collect form data
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }

        console.log('Form submitted with data:', data);
        alert('Form submitted! Check console for data.');
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
                                        className="mt-1 block w-full rounded-md shadow-sm"
                                        style={baseStyle}
                                    />
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
                                        className="mt-1 block w-full rounded-md shadow-sm"
                                        style={baseStyle}
                                    ></textarea>
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
                                        className="mt-1 block w-full rounded-md shadow-sm"
                                        style={baseStyle}
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
                                <div key={field.id} className="mb-3 flex items-center">
                                    <input type="checkbox" name={field.id} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                                    <label className="ml-2 block text-sm text-gray-900">{field.label}</label>
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
                                                <input type="radio" name={field.id} value={option} className="h-4 w-4 text-blue-600 border-gray-300" />
                                                <label className="ml-2 block text-sm text-gray-900">{option}</label>
                                            </div>
                                        ))}
                                    </div>
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