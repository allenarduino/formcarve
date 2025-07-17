"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Icons for the UI
import { ArrowLeft, Save, Eye, ExternalLink, Code, Download } from "lucide-react";
import { toast } from "sonner";
import FormBuilder from "@/components/forms/form-builder";
import FormPreviewModal from "@/components/forms/form-preview-modal";
import { FormField } from "@jonesstack/react-form-engine";

export default function FormBuilderPage() {
    const [form, setForm] = useState<any>({ id: "new-form-1", name: "My First FormCarve Form" });
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [showEmbed, setShowEmbed] = useState(false);
    const [currentFields, setCurrentFields] = useState<FormField[]>([]);

    useEffect(() => {
        // Example: Add a default submit button if no fields exist initially
        if (currentFields.length === 0) {
            const defaultSubmitButton: FormField = {
                id: 'default-submit-button',
                type: 'submit-button',
                label: 'Submit',
                required: false,
                styling: {
                    borderRadius: 6,
                    backgroundColor: '#3b82f6',
                    borderColor: '#3b82f6',
                    textColor: '#ffffff',
                    fontSize: 16,
                    padding: 12,
                },
            };
            setCurrentFields([defaultSubmitButton]);
        }
    }, []);

    // This function will be called by FormBuilder when fields change or are "saved"
    const handleSave = async (fields: FormField[]) => {
        setSaving(true);
        try {
            // In this MVP, "saving" means updating local state and preparing for export.
            // The actual JSON export happens when the "Export JSON" button is clicked.
            console.log('Form fields updated internally:', fields);
            // setCurrentFields(fields); // setCurrentFields is already called by handleFieldsChange
            toast.success('Form fields updated successfully!');
        } catch (error) {
            console.error('Error updating form fields:', error);
            toast.error('Failed to update form fields');
        } finally {
            setSaving(false);
        }
    };

    const handlePreview = () => {
        setShowPreview(true);
    };

    // This is the core function for client-side JSON export
    const exportJsonSchema = () => {
        const schema = {
            formName: form.name,
            formFields: currentFields,
        };
        const jsonString = JSON.stringify(schema, null, 2); // Pretty print JSON

        // 1. Copy to clipboard
        navigator.clipboard.writeText(jsonString);
        toast.success('JSON schema copied to clipboard!');

        // 2. Offer to download as a file
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${form.name.toLowerCase().replace(/\s/g, '-')}-schema.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url); // Release the object URL
        toast.success('JSON schema downloaded as file!');
    };

    const handleFieldsChange = (fields: FormField[]) => {
        setCurrentFields(fields);
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" disabled>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                    </Button>
                </div>
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
            </div>
        );
    }

    // No 'form not found' state for MVP as 'form' is always initialized.

    return (
        <div className="space-y-6 p-4"> {/* Some padding to the main container */}
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" onClick={() => console.log("Back button clicked - no router in MVP")}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">Form Builder</h1>
                        <p className="text-muted-foreground">{form.name}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={handlePreview}>
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                    </Button>

                    {/* The main action for MVP: Export JSON */}
                    <Button onClick={exportJsonSchema} disabled={saving}>
                        <Download className="h-4 w-4 mr-2" />
                        {saving ? 'Exporting...' : 'Export JSON'}
                    </Button>
                </div>
            </div>

            {/* Form Builder Component */}
            {/* Using a fixed height for demonstration, adjust as needed */}
            <div className="h-[calc(100vh-200px)]">
                <FormBuilder
                    formId={form.id}
                    initialFields={currentFields}
                    onSave={handleSave} // Calls handleSave (which is now just internal update)
                    onFieldsChange={handleFieldsChange} // Keeps currentFields state updated
                />
            </div>

            {/* Preview Modal */}
            <FormPreviewModal
                isOpen={showPreview}
                onClose={() => setShowPreview(false)}
                fields={currentFields}
                formName={form?.name}
            />
        </div>
    );
}







