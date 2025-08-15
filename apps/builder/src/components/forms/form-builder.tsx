"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
    Plus, GripVertical, Trash2, Type, Mail, MessageSquare, Hash, Calendar, CheckSquare, List, Star, Image, FileText, Phone, Globe, MapPin, CreditCard, Settings, Palette, Smartphone, Monitor
} from "lucide-react";

import { FormField } from "@jonesstack/react-form-engine";


interface FormBuilderProps {
    formId: string;
    initialFields?: FormField[];
    onSave?: (fields: FormField[]) => void;
    onFieldsChange?: (fields: FormField[]) => void;
}

const FIELD_TYPES = [
    { id: 'text', label: 'Text Input', icon: Type, description: 'Single line text input' },
    { id: 'email', label: 'Email', icon: Mail, description: 'Email address input' },
    { id: 'textarea', label: 'Text Area', icon: MessageSquare, description: 'Multi-line text input' },
    { id: 'number', label: 'Number', icon: Hash, description: 'Numeric input' },
    { id: 'date', label: 'Date', icon: Calendar, description: 'Date picker' },
    { id: 'checkbox', label: 'Checkbox', icon: CheckSquare, description: 'Single checkbox' },
    { id: 'radio', label: 'Radio Group', icon: List, description: 'Radio button group' },
    { id: 'select', label: 'Dropdown', icon: List, description: 'Select dropdown' },
    { id: 'rating', label: 'Rating', icon: Star, description: 'Star rating' },
    { id: 'file', label: 'File Upload', icon: Image, description: 'File upload input' },
    { id: 'phone', label: 'Phone', icon: Phone, description: 'Phone number input' },
    { id: 'url', label: 'URL', icon: Globe, description: 'Website URL input' },
    { id: 'address', label: 'Address', icon: MapPin, description: 'Address input' },
    { id: 'credit-card', label: 'Credit Card', icon: CreditCard, description: 'Credit card input' },
    { id: 'submit-button', label: 'Submit Button', icon: Settings, description: 'Customizable submit button' },
];


export default function FormBuilder({ formId, initialFields = [], onSave, onFieldsChange }: FormBuilderProps) {
    // Add default submit button if no submit button exists
    const getInitialFields = useCallback(() => {
        const hasSubmitButton = initialFields.some(field => field.type === 'submit-button');
        if (!hasSubmitButton) {
            const defaultSubmitButton: FormField = {
                id: 'default-submit-button',
                type: 'submit-button',
                label: 'Submit',
                placeholder: '',
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
            return [...initialFields, defaultSubmitButton];
        }
        return initialFields;
    }, [initialFields]);

    const [fields, setFields] = useState<FormField[]>(getInitialFields());
    const [selectedField, setSelectedField] = useState<FormField | null>(null);
    const [showFieldTypes, setShowFieldTypes] = useState(false);
    const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
    const isInitialMount = useRef(true);

    // Update internal fields state when initialFields prop changes
    // This is important if `initialFields` comes from an async source or parent state
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return; // Skip the first render to avoid calling onFieldsChange during initial mount
        }

        const newFields = getInitialFields();
        setFields(newFields);
        onFieldsChange?.(newFields);
    }, [initialFields]);

    const generateFieldId = () => `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const addField = useCallback((type: string) => {
        // Prevent adding multiple submit buttons
        if (type === 'submit-button' && fields.some(field => field.type === 'submit-button')) {
            return;
        }

        let newField: FormField;

        if (type === 'submit-button') {
            newField = {
                id: generateFieldId(),
                type,
                label: 'Submit',
                placeholder: '',
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
        } else {
            newField = {
                id: generateFieldId(),
                type,
                label: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
                placeholder: `Enter ${type}...`,
                required: false,
                styling: {
                    borderRadius: 6,
                    backgroundColor: '#ffffff',
                    borderColor: '#d1d5db',
                    textColor: '#000000',
                    fontSize: 14,
                    padding: 12,
                },
            };

            // Add default options for certain field types
            if (['select', 'radio'].includes(type)) {
                newField.options = ['Option 1', 'Option 2', 'Option 3'];
            }
        }

        setFields(prev => {
            const newFields = [...prev, newField];
            // Use setTimeout to avoid calling onFieldsChange during render
            setTimeout(() => {
                onFieldsChange?.(newFields);
            }, 0);
            return newFields;
        });
        setSelectedField(newField); // Select the newly added field
        setShowFieldTypes(false); // Close the add field panel
    }, [onFieldsChange, fields]);

    const updateField = useCallback((fieldId: string, updates: Partial<FormField>) => {
        setFields(prev => {
            const newFields = prev.map(field =>
                field.id === fieldId ? { ...field, ...updates } : field
            );
            // Use setTimeout to avoid calling onFieldsChange during render
            setTimeout(() => {
                onFieldsChange?.(newFields);
            }, 0);
            return newFields;
        });

        // Also update the selectedField if it's the one being edited
        if (selectedField?.id === fieldId) {
            setSelectedField(prev => prev ? { ...prev, ...updates } : null);
        }
    }, [selectedField, onFieldsChange]);

    const removeField = useCallback((fieldId: string) => {
        setFields(prev => {
            // Prevent removing the last submit button
            const fieldToRemove = prev.find(field => field.id === fieldId);
            if (fieldToRemove?.type === 'submit-button' && prev.filter(field => field.type === 'submit-button').length === 1) {
                return prev; // Don't remove the last submit button
            }

            const newFields = prev.filter(field => field.id !== fieldId);
            // Use setTimeout to avoid calling onFieldsChange during render
            setTimeout(() => {
                onFieldsChange?.(newFields);
            }, 0);
            return newFields;
        });
        if (selectedField?.id === fieldId) {
            setSelectedField(null); // Deselect if the removed field was selected
        }
    }, [selectedField, onFieldsChange]);

    const handleDragEnd = useCallback((result: any) => {
        if (!result.destination) return;

        const items = Array.from(fields);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setFields(items);
        // Use setTimeout to avoid calling onFieldsChange during render
        setTimeout(() => {
            onFieldsChange?.(items);
        }, 0);
    }, [fields, onFieldsChange]);

    const renderFieldPreview = (field: FormField) => {
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
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">{field.label}</Label>
                        <Input
                            type={field.type}
                            placeholder={field.placeholder}
                            style={baseStyle}
                            disabled
                        />
                    </div>
                );

            case 'textarea':
                return (
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">{field.label}</Label>
                        <Textarea
                            placeholder={field.placeholder}
                            style={baseStyle}
                            disabled
                        />
                    </div>
                );

            case 'select':
                return (
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">{field.label}</Label>
                        <Select disabled>
                            <SelectTrigger style={baseStyle}>
                                <SelectValue placeholder={field.placeholder} />
                            </SelectTrigger>
                            <SelectContent>
                                {field.options?.map((option, index) => (
                                    <SelectItem key={index} value={option}>
                                        {option}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                );

            case 'checkbox':
                return (
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            disabled
                            className="h-4 w-4"
                        />
                        <Label className="text-sm font-medium">{field.label}</Label>
                    </div>
                );

            case 'radio':
                return (
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">{field.label}</Label>
                        <div className="space-y-2">
                            {field.options?.map((option, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name={field.id}
                                        disabled
                                        className="h-4 w-4"
                                    />
                                    <Label className="text-sm">{option}</Label>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'rating':
                return (
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">{field.label}</Label>
                        <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="h-5 w-5 text-gray-300" />
                            ))}
                        </div>
                    </div>
                );

            case 'file':
                return (
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">{field.label}</Label>
                        <div
                            className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center"
                            style={baseStyle}
                        >
                            <FileText className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500">Click to upload file</p>
                        </div>
                    </div>
                );

            case 'submit-button':
                return (
                    <div className="space-y-2">
                        <button
                            type="button"
                            className="w-full"
                            style={{
                                borderRadius: field.styling?.borderRadius || 6,
                                backgroundColor: field.styling?.backgroundColor || '#3b82f6',
                                border: `1px solid ${field.styling?.borderColor || '#3b82f6'}`,
                                color: field.styling?.textColor || '#ffffff',
                                fontSize: field.styling?.fontSize || 16,
                                padding: field.styling?.padding || 12,
                                fontWeight: '500',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s',
                            }}
                            disabled
                        >
                            {field.label}
                        </button>
                    </div>
                );

            default:
                return (
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">{field.label}</Label>
                        <Input
                            placeholder={field.placeholder}
                            style={baseStyle}
                            disabled
                        />
                    </div>
                );
        }
    };

    const renderFieldProperties = () => {
        if (!selectedField) return null;

        return (
            <Card className="w-80">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        Field Properties
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 max-h-[70vh] overflow-y-auto">
                    {/* Basic Properties */}
                    <div className="space-y-2">
                        <Label>{selectedField.type === 'submit-button' ? 'Button Text' : 'Label'}</Label>
                        <Input
                            value={selectedField.label}
                            onChange={(e) => updateField(selectedField.id, { label: e.target.value })}
                        />
                    </div>

                    {selectedField.type !== 'submit-button' && (
                        <>
                            <div className="space-y-2">
                                <Label>Placeholder</Label>
                                <Input
                                    value={selectedField.placeholder || ''}
                                    onChange={(e) => updateField(selectedField.id, { placeholder: e.target.value })}
                                />
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch
                                    checked={selectedField.required}
                                    onCheckedChange={(checked) => updateField(selectedField.id, { required: checked })}
                                />
                                <Label>Required</Label>
                            </div>
                        </>
                    )}

                    {/* Options for select/radio fields */}
                    {['select', 'radio'].includes(selectedField.type) && (
                        <div className="space-y-2">
                            <Label>Options</Label>
                            <div className="space-y-2">
                                {selectedField.options?.map((option, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input
                                            value={option}
                                            onChange={(e) => {
                                                const newOptions = [...(selectedField.options || [])];
                                                newOptions[index] = e.target.value;
                                                updateField(selectedField.id, { options: newOptions });
                                            }}
                                        />
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                const newOptions = selectedField.options?.filter((_, i) => i !== index);
                                                updateField(selectedField.id, { options: newOptions });
                                            }}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        const newOptions = [...(selectedField.options || []), `Option ${(selectedField.options?.length || 0) + 1}`];
                                        updateField(selectedField.id, { options: newOptions });
                                    }}
                                >
                                    <Plus className="h-4 w-4 mr-1" />
                                    Add Option
                                </Button>
                            </div>
                        </div>
                    )}

                    <Separator />

                    {/* Validation Properties */}
                    {selectedField.type !== 'submit-button' && (
                        <>
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2">
                                    <CheckSquare className="h-4 w-4" />
                                    Validation
                                </Label>
                            </div>

                            {/* Min/Max Length for text fields */}
                            {['text', 'email', 'textarea', 'phone', 'url'].includes(selectedField.type) && (
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="space-y-1">
                                        <Label className="text-xs">Min Length</Label>
                                        <Input
                                            type="number"
                                            placeholder="Min"
                                            value={selectedField.validation?.minLength || ''}
                                            onChange={(e) => updateField(selectedField.id, {
                                                validation: {
                                                    ...selectedField.validation,
                                                    minLength: e.target.value ? parseInt(e.target.value) : undefined
                                                }
                                            })}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs">Max Length</Label>
                                        <Input
                                            type="number"
                                            placeholder="Max"
                                            value={selectedField.validation?.maxLength || ''}
                                            onChange={(e) => updateField(selectedField.id, {
                                                validation: {
                                                    ...selectedField.validation,
                                                    maxLength: e.target.value ? parseInt(e.target.value) : undefined
                                                }
                                            })}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Min/Max Value for number fields */}
                            {selectedField.type === 'number' && (
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="space-y-1">
                                        <Label className="text-xs">Min Value</Label>
                                        <Input
                                            type="number"
                                            placeholder="Min"
                                            value={selectedField.validation?.min || ''}
                                            onChange={(e) => updateField(selectedField.id, {
                                                validation: {
                                                    ...selectedField.validation,
                                                    min: e.target.value ? parseInt(e.target.value) : undefined
                                                }
                                            })}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs">Max Value</Label>
                                        <Input
                                            type="number"
                                            placeholder="Max"
                                            value={selectedField.validation?.max || ''}
                                            onChange={(e) => updateField(selectedField.id, {
                                                validation: {
                                                    ...selectedField.validation,
                                                    max: e.target.value ? parseInt(e.target.value) : undefined
                                                }
                                            })}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Pattern validation */}
                            <div className="space-y-2">
                                <Label className="text-xs">Regex Pattern</Label>
                                <Input
                                    placeholder="e.g., ^[A-Za-z]+$ for letters only"
                                    value={selectedField.validation?.pattern || ''}
                                    onChange={(e) => updateField(selectedField.id, {
                                        validation: {
                                            ...selectedField.validation,
                                            pattern: e.target.value || undefined
                                        }
                                    })}
                                />
                            </div>

                            {/* Custom error message */}
                            <div className="space-y-2">
                                <Label className="text-xs">Custom Error Message</Label>
                                <Input
                                    placeholder="Custom validation error message"
                                    value={selectedField.validation?.customMessage || ''}
                                    onChange={(e) => updateField(selectedField.id, {
                                        validation: {
                                            ...selectedField.validation,
                                            customMessage: e.target.value || undefined
                                        }
                                    })}
                                />
                            </div>

                            {/* Quick validation presets */}
                            <div className="space-y-2">
                                <Label className="text-xs">Quick Validation</Label>
                                <div className="flex flex-wrap gap-1">
                                    {selectedField.type === 'email' && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => updateField(selectedField.id, {
                                                validation: {
                                                    ...selectedField.validation,
                                                    pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
                                                    customMessage: 'Please enter a valid email address'
                                                }
                                            })}
                                        >
                                            Email Format
                                        </Button>
                                    )}
                                    {selectedField.type === 'phone' && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => updateField(selectedField.id, {
                                                validation: {
                                                    ...selectedField.validation,
                                                    pattern: '^[+]?[1-9]\\d{1,14}$',
                                                    customMessage: 'Please enter a valid phone number'
                                                }
                                            })}
                                        >
                                            Phone Format
                                        </Button>
                                    )}
                                    {selectedField.type === 'url' && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => updateField(selectedField.id, {
                                                validation: {
                                                    ...selectedField.validation,
                                                    pattern: '^https?:\\/\\/.+',
                                                    customMessage: 'Please enter a valid URL'
                                                }
                                            })}
                                        >
                                            URL Format
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </>
                    )}

                    <Separator />

                    {/* Styling Properties */}
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                            <Palette className="h-4 w-4" />
                            Styling
                        </Label>
                    </div>

                    <div className="space-y-2">
                        <Label>Border Radius (px)</Label>
                        <Input
                            type="number"
                            value={selectedField.styling?.borderRadius || 6}
                            onChange={(e) => updateField(selectedField.id, {
                                styling: { ...selectedField.styling, borderRadius: parseInt(e.target.value) || 0 }
                            })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Background Color</Label>
                        <Input
                            type="color"
                            value={selectedField.styling?.backgroundColor || '#ffffff'}
                            onChange={(e) => updateField(selectedField.id, {
                                styling: { ...selectedField.styling, backgroundColor: e.target.value }
                            })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Border Color</Label>
                        <Input
                            type="color"
                            value={selectedField.styling?.borderColor || '#d1d5db'}
                            onChange={(e) => updateField(selectedField.id, {
                                styling: { ...selectedField.styling, borderColor: e.target.value }
                            })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Text Color</Label>
                        <Input
                            type="color"
                            value={selectedField.styling?.textColor || '#000000'}
                            onChange={(e) => updateField(selectedField.id, {
                                styling: { ...selectedField.styling, textColor: e.target.value }
                            })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Font Size (px)</Label>
                        <Input
                            type="number"
                            value={selectedField.styling?.fontSize || 14}
                            onChange={(e) => updateField(selectedField.id, {
                                styling: { ...selectedField.styling, fontSize: parseInt(e.target.value) || 14 }
                            })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Padding (px)</Label>
                        <Input
                            type="number"
                            value={selectedField.styling?.padding || 12}
                            onChange={(e) => updateField(selectedField.id, {
                                styling: { ...selectedField.styling, padding: parseInt(e.target.value) || 12 }
                            })}
                        />
                    </div>

                    <Separator />

                    {/* Delete Field */}
                    {selectedField.type === 'submit-button' && fields.filter(field => field.type === 'submit-button').length === 1 ? (
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">Cannot delete the last submit button</p>
                        </div>
                    ) : (
                        <Button
                            variant="destructive"
                            onClick={() => removeField(selectedField.id)}
                            className="w-full"
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Field
                        </Button>
                    )}
                </CardContent>
            </Card>
        );
    };

    return (
        <div className="flex gap-6 h-full">
            {/* Left Panel - Field Types */}
            <div className="w-64 space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Add Fields</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Button
                            onClick={() => setShowFieldTypes(!showFieldTypes)}
                            className="w-full"
                            variant={showFieldTypes ? "default" : "outline"}
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Field Type
                        </Button>


                        {showFieldTypes && (
                            <div className="mt-4 space-y-2">
                                {FIELD_TYPES.map((fieldType) => {
                                    const Icon = fieldType.icon;
                                    return (
                                        <Button
                                            key={fieldType.id}
                                            variant="ghost"
                                            className="w-full justify-start h-auto p-3"
                                            onClick={() => addField(fieldType.id)}
                                        >
                                            <Icon className="h-4 w-4 mr-2" />
                                            <div className="text-left">
                                                <div className="font-medium">{fieldType.label}</div>
                                                <div className="text-xs text-muted-foreground">{fieldType.description}</div>
                                            </div>
                                        </Button>
                                    );
                                })}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Form Info */}
                <Card>
                    <CardHeader>
                        <CardTitle>Form Info</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Total Fields:</span>
                                    <Badge variant="secondary">{fields.length}</Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Required Fields:</span>
                                    <Badge variant="secondary">{fields.filter(f => f.required).length}</Badge>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-2">
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setPreviewMode('desktop')}
                                        className="flex-1"
                                    >
                                        <Monitor className="h-3 w-3 mr-1" />
                                        Desktop
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setPreviewMode('mobile')}
                                        className="flex-1"
                                    >
                                        <Smartphone className="h-3 w-3 mr-1" />
                                        Mobile
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Center Panel - Form Canvas */}
            <div className="flex-1">
                <div className="mb-4 p-3 bg-white rounded-lg border shadow-sm">
                    <div className="flex flex-col items-center gap-3">
                        <div className="flex items-center gap-2">
                            <div className="flex gap-2">
                                <Button
                                    variant={previewMode === 'desktop' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setPreviewMode('desktop')}
                                    className="flex items-center gap-2"
                                >
                                    <Monitor className="h-4 w-4" />
                                    Desktop
                                </Button>
                                <Button
                                    variant={previewMode === 'mobile' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setPreviewMode('mobile')}
                                    className="flex items-center gap-2"
                                >
                                    <Smartphone className="h-4 w-4" />
                                    Mobile
                                </Button>
                            </div>
                        </div>
                        <div className="text-sm text-gray-600">
                            {previewMode === 'mobile' ? 'Mobile View (375px)' : 'Desktop View (Full Width)'}
                        </div>
                    </div>
                </div>

                <Card className="h-full">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Form Canvas</CardTitle>
                                <p className="text-sm text-muted-foreground">
                                    Drag and drop fields to reorder them. Click on a field to edit its properties.
                                </p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>

                        {/* Form Canvas with Responsive Preview */}
                        <div
                            className={`mx-auto transition-all duration-300 ${previewMode === 'mobile' ? 'max-w-[375px]' : 'w-full'
                                }`}
                        >
                            <DragDropContext onDragEnd={handleDragEnd}>
                                <Droppable droppableId="form-fields">
                                    {(provided) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className="space-y-4 min-h-[400px] p-4 border-2 border-dashed border-gray-200 rounded-lg"
                                        >
                                            {fields.length === 0 ? (
                                                <div className="text-center py-12">
                                                    <Plus className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                                                    <p className="text-gray-500">No fields added yet. Click "Add Field Type" to get started.</p>
                                                </div>
                                            ) : (
                                                fields.map((field, index) => (
                                                    <Draggable key={field.id} draggableId={field.id} index={index}>
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedField?.id === field.id
                                                                    ? 'border-blue-500 bg-blue-50'
                                                                    : 'border-gray-200 hover:border-gray-300'
                                                                    } ${snapshot.isDragging ? 'shadow-lg' : ''}`}
                                                                onClick={() => setSelectedField(field)}
                                                            >
                                                                <div className="flex items-center justify-between mb-3">
                                                                    <div className="flex items-center gap-2">
                                                                        <div {...provided.dragHandleProps}>
                                                                            <GripVertical className="h-4 w-4 text-gray-400" />
                                                                        </div>
                                                                        <Badge variant="outline">{field.type}</Badge>
                                                                        {field.required && (
                                                                            <Badge variant="destructive" className="text-xs">Required</Badge>
                                                                        )}
                                                                    </div>
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation(); // Prevent selecting the field when deleting
                                                                            removeField(field.id);
                                                                        }}
                                                                    >
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </Button>
                                                                </div>
                                                                {renderFieldPreview(field)}
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))
                                            )}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Right Panel - Field Properties */}
            {renderFieldProperties()}
        </div>
    );
}