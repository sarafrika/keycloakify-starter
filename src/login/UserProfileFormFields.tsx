import { useEffect, Fragment } from "react";
import { assert } from "keycloakify/tools/assert";
import type { KcClsx } from "keycloakify/login/lib/kcClsx";
import {
    useUserProfileForm,
    getButtonToDisplayForMultivaluedAttributeField,
    type FormAction,
    type FormFieldError
} from "keycloakify/login/lib/useUserProfileForm";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import type { Attribute, KcContext } from "keycloakify/login/KcContext";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { I18n } from "./i18n";
import PasswordWrapper from "@/login/PasswordWrapper.tsx";

export default function UserProfileFormFields(props: UserProfileFormFieldsProps<KcContext, I18n>) {
    const { kcContext, i18n, kcClsx, onIsFormSubmittableValueChange, doMakeUserConfirmPassword, BeforeField, AfterField } = props;

    const { advancedMsg } = i18n;

    const {
        formState: { formFieldStates, isFormSubmittable },
        dispatchFormAction
    } = useUserProfileForm({
        kcContext,
        i18n,
        doMakeUserConfirmPassword
    });

    useEffect(() => {
        onIsFormSubmittableValueChange(isFormSubmittable);
    }, [isFormSubmittable]);

    const groupNameRef = { current: "" };

    const getFieldIcon = (attribute: Attribute) => {
        const name = attribute.name.toLowerCase();
        if (name.includes('email')) {
            return (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
            );
        }
        if (name.includes('name') || name.includes('firstname') || name.includes('lastname')) {
            return (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            );
        }
        if (name.includes('phone') || name.includes('mobile')) {
            return (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            );
        }
        if (name.includes('password')) {
            return (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            );
        }
        // Default icon
        return (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        );
    };

    return (
        <div className="space-y-6">
            {formFieldStates.map(({ attribute, displayableErrors, valueOrValues }) => {
                const fieldValue = Array.isArray(valueOrValues) ? valueOrValues.join('') : valueOrValues;

                return (
                    <div key={attribute.name}>
                        <GroupLabel attribute={attribute} groupNameRef={groupNameRef} i18n={i18n} kcClsx={kcClsx} />

                        {BeforeField !== undefined && (
                            <BeforeField
                                attribute={attribute}
                                dispatchFormAction={dispatchFormAction}
                                displayableErrors={displayableErrors}
                                valueOrValues={valueOrValues}
                                kcClsx={kcClsx}
                                i18n={i18n}
                            />
                        )}

                        <div
                            style={{
                                display:
                                    attribute.annotations.inputType === "hidden" ||
                                    (attribute.name === "password-confirm" && !doMakeUserConfirmPassword)
                                        ? "none"
                                        : undefined
                            }}
                        >
                            {/* Helper text before */}
                            {attribute.annotations.inputHelperTextBefore !== undefined && (
                                <div
                                    className="mb-3 text-sm text-slate-600 dark:text-slate-400"
                                    id={`form-help-text-before-${attribute.name}`}
                                    aria-live="polite"
                                >
                                    {advancedMsg(attribute.annotations.inputHelperTextBefore)}
                                </div>
                            )}

                            {/* Field with floating label or traditional label based on type */}
                            {(attribute.annotations.inputType === "select-radiobuttons" ||
                                attribute.annotations.inputType === "multiselect-checkboxes") ? (
                                // Traditional labels for radio/checkbox groups
                                <div className="space-y-3">
                                    <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                        {advancedMsg(attribute.displayName ?? "")}
                                        {attribute.required && <span className="text-red-500 ml-1">*</span>}
                                    </Label>
                                    <InputFieldByType
                                        attribute={attribute}
                                        valueOrValues={valueOrValues}
                                        displayableErrors={displayableErrors}
                                        dispatchFormAction={dispatchFormAction}
                                        kcClsx={kcClsx}
                                        i18n={i18n}
                                    />
                                </div>
                            ) : (
                                // Floating labels for other input types
                                <div className="relative group">
                                    {/* Icon for most field types */}
                                    {attribute.annotations.inputType !== "hidden" &&
                                        attribute.annotations.inputType !== "textarea" && (
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                                            <span className="text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200">
                                                {getFieldIcon(attribute)}
                                            </span>
                                            </div>
                                        )}

                                    {/* Input field */}
                                    <InputFieldByType
                                        attribute={attribute}
                                        valueOrValues={valueOrValues}
                                        displayableErrors={displayableErrors}
                                        dispatchFormAction={dispatchFormAction}
                                        kcClsx={kcClsx}
                                        i18n={i18n}
                                    />

                                    {/* Floating label */}
                                    {attribute.annotations.inputType !== "hidden" && (
                                        <Label
                                            htmlFor={attribute.name}
                                            className={cn(
                                                "absolute transition-all duration-200 pointer-events-none",
                                                "text-slate-500 dark:text-slate-400",
                                                attribute.annotations.inputType === "textarea"
                                                    ? "left-4"
                                                    : attribute.annotations.inputType === "select" || attribute.annotations.inputType === "multiselect"
                                                        ? "left-4"
                                                        : "left-12",
                                                fieldValue
                                                    ? `top-2 text-xs font-medium text-blue-600 dark:text-blue-400`
                                                    : attribute.annotations.inputType === "textarea"
                                                        ? "top-4 text-sm"
                                                        : "top-1/2 -translate-y-1/2 text-sm"
                                            )}
                                        >
                                            {advancedMsg(attribute.displayName ?? "")}
                                            {attribute.required && <span className="text-red-500 ml-1">*</span>}
                                        </Label>
                                    )}
                                </div>
                            )}

                            {/* Field errors */}
                            <FieldErrors
                                attribute={attribute}
                                displayableErrors={displayableErrors}
                                kcClsx={kcClsx}
                                fieldIndex={undefined}
                            />

                            {/* Helper text after */}
                            {attribute.annotations.inputHelperTextAfter !== undefined && (
                                <div
                                    className="mt-3 text-sm text-slate-600 dark:text-slate-400"
                                    id={`form-help-text-after-${attribute.name}`}
                                    aria-live="polite"
                                >
                                    {advancedMsg(attribute.annotations.inputHelperTextAfter)}
                                </div>
                            )}

                            {AfterField !== undefined && (
                                <AfterField
                                    attribute={attribute}
                                    dispatchFormAction={dispatchFormAction}
                                    displayableErrors={displayableErrors}
                                    valueOrValues={valueOrValues}
                                    kcClsx={kcClsx}
                                    i18n={i18n}
                                />
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function GroupLabel(props: {
    attribute: Attribute;
    groupNameRef: { current: string };
    i18n: I18n;
    kcClsx: KcClsx;
}) {
    const { attribute, groupNameRef, i18n } = props;
    const { advancedMsg } = i18n;

    if (attribute.group?.name !== groupNameRef.current) {
        groupNameRef.current = attribute.group?.name ?? "";

        if (groupNameRef.current !== "") {
            assert(attribute.group !== undefined);

            return (
                <div
                    className="mb-6 pb-4 border-b border-slate-200 dark:border-slate-700"
                    {...Object.fromEntries(Object.entries(attribute.group.html5DataAnnotations).map(([key, value]) => [`data-${key}`, value]))}
                >
                    {(() => {
                        const groupDisplayHeader = attribute.group.displayHeader ?? "";
                        const groupHeaderText = groupDisplayHeader !== "" ? advancedMsg(groupDisplayHeader) : attribute.group.name;

                        return (
                            <h3
                                id={`header-${attribute.group.name}`}
                                className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2"
                            >
                                {groupHeaderText}
                            </h3>
                        );
                    })()}
                    {(() => {
                        const groupDisplayDescription = attribute.group.displayDescription ?? "";

                        if (groupDisplayDescription !== "") {
                            const groupDescriptionText = advancedMsg(groupDisplayDescription);

                            return (
                                <p
                                    id={`description-${attribute.group.name}`}
                                    className="text-sm text-slate-600 dark:text-slate-400"
                                >
                                    {groupDescriptionText}
                                </p>
                            );
                        }

                        return null;
                    })()}
                </div>
            );
        }
    }

    return null;
}

function FieldErrors(props: {
    attribute: Attribute;
    displayableErrors: FormFieldError[];
    fieldIndex: number | undefined;
    kcClsx: KcClsx;
}) {
    const { attribute, fieldIndex } = props;

    const displayableErrors = props.displayableErrors.filter(error => error.fieldIndex === fieldIndex);

    if (displayableErrors.length === 0) {
        return null;
    }

    return (
        <div className="flex items-center gap-2 mt-3 p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-lg">
            <svg className="h-4 w-4 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span
                id={`input-error-${attribute.name}${fieldIndex === undefined ? "" : `-${fieldIndex}`}`}
                className="text-sm text-red-600 dark:text-red-400"
                aria-live="polite"
            >
                {displayableErrors
                    .filter(error => error.fieldIndex === fieldIndex)
                    .map(({ errorMessage }, i, arr) => (
                        <Fragment key={i}>
                            {errorMessage}
                            {arr.length - 1 !== i && <br />}
                        </Fragment>
                    ))}
            </span>
        </div>
    );
}

type InputFieldByTypeProps = {
    attribute: Attribute;
    valueOrValues: string | string[];
    displayableErrors: FormFieldError[];
    dispatchFormAction: React.Dispatch<FormAction>;
    i18n: I18n;
    kcClsx: KcClsx;
};

function InputFieldByType(props: InputFieldByTypeProps) {
    const { attribute, valueOrValues } = props;

    switch (attribute.annotations.inputType) {
        case "hidden":
            return <input type="hidden" name={attribute.name} value={valueOrValues} />;
        case "textarea":
            return <TextareaTag {...props} />;
        case "select":
        case "multiselect":
            return <SelectTag {...props} />;
        case "select-radiobuttons":
        case "multiselect-checkboxes":
            return <InputTagSelects {...props} />;
        default: {
            if (valueOrValues instanceof Array) {
                return (
                    <div className="space-y-3">
                        {valueOrValues.map((...[, i]) => (
                            <InputTag key={i} {...props} fieldIndex={i} />
                        ))}
                    </div>
                );
            }

            const inputNode = <InputTag {...props} fieldIndex={undefined} />;

            if (attribute.name === "password" || attribute.name === "password-confirm") {
                return (
                    <PasswordWrapper i18n={props.i18n} passwordInputId={attribute.name}>
                        {inputNode}
                    </PasswordWrapper>
                );
            }

            return inputNode;
        }
    }
}

function InputTag(props: InputFieldByTypeProps & { fieldIndex: number | undefined }) {
    const { attribute, fieldIndex, dispatchFormAction, valueOrValues, i18n, displayableErrors } = props;
    const hasError = displayableErrors.find(error => error.fieldIndex === fieldIndex) !== undefined;

    return (
        <div className="space-y-2">
            <Input
                type={(() => {
                    const { inputType } = attribute.annotations;
                    if (inputType?.startsWith("html5-")) {
                        return inputType.slice(6);
                    }
                    return inputType ?? "text";
                })()}
                id={attribute.name}
                name={attribute.name}
                value={(() => {
                    if (fieldIndex !== undefined) {
                        assert(valueOrValues instanceof Array);
                        return valueOrValues[fieldIndex];
                    }
                    assert(typeof valueOrValues === "string");
                    return valueOrValues;
                })()}
                className={cn(
                    "w-full h-14 pl-12 pt-6 pb-2 bg-white/80 dark:bg-slate-800/80",
                    "border-2 border-slate-200 dark:border-slate-700 rounded-xl",
                    "focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                    "transition-all duration-200 placeholder-transparent",
                    hasError && "border-red-300 dark:border-red-600 focus:ring-red-500"
                )}
                aria-invalid={hasError}
                disabled={attribute.readOnly}
                autoComplete={attribute.autocomplete}
                placeholder=" "
                pattern={attribute.annotations.inputTypePattern}
                size={attribute.annotations.inputTypeSize === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeSize}`)}
                maxLength={
                    attribute.annotations.inputTypeMaxlength === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeMaxlength}`)
                }
                minLength={
                    attribute.annotations.inputTypeMinlength === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeMinlength}`)
                }
                max={attribute.annotations.inputTypeMax}
                min={attribute.annotations.inputTypeMin}
                step={attribute.annotations.inputTypeStep}
                {...Object.fromEntries(Object.entries(attribute.html5DataAnnotations ?? {}).map(([key, value]) => [`data-${key}`, value]))}
                onChange={event =>
                    dispatchFormAction({
                        action: "update",
                        name: attribute.name,
                        valueOrValues: (() => {
                            if (fieldIndex !== undefined) {
                                assert(valueOrValues instanceof Array);
                                return valueOrValues.map((value, i) => {
                                    if (i === fieldIndex) {
                                        return event.target.value;
                                    }
                                    return value;
                                });
                            }
                            return event.target.value;
                        })()
                    })
                }
                onBlur={() =>
                    dispatchFormAction({
                        action: "focus lost",
                        name: attribute.name,
                        fieldIndex: fieldIndex
                    })
                }
            />

            {/* Multi-value field controls */}
            {fieldIndex !== undefined && (
                <>
                    <FieldErrors attribute={attribute} kcClsx={props.kcClsx} displayableErrors={displayableErrors} fieldIndex={fieldIndex} />
                    <AddRemoveButtonsMultiValuedAttribute
                        attribute={attribute}
                        values={valueOrValues as string[]}
                        fieldIndex={fieldIndex}
                        dispatchFormAction={dispatchFormAction}
                        i18n={i18n}
                    />
                </>
            )}
        </div>
    );
}

function AddRemoveButtonsMultiValuedAttribute(props: {
    attribute: Attribute;
    values: string[];
    fieldIndex: number;
    dispatchFormAction: React.Dispatch<Extract<FormAction, { action: "update" }>>;
    i18n: I18n;
}) {
    const { attribute, values, fieldIndex, dispatchFormAction, i18n } = props;
    const { msg } = i18n;
    const { hasAdd, hasRemove } = getButtonToDisplayForMultivaluedAttributeField({ attribute, values, fieldIndex });
    const idPostfix = `-${attribute.name}-${fieldIndex + 1}`;

    return (
        <div className="flex gap-2">
            {hasRemove && (
                <Button
                    id={`kc-remove${idPostfix}`}
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300 dark:text-red-400 dark:hover:text-red-300"
                    onClick={() =>
                        dispatchFormAction({
                            action: "update",
                            name: attribute.name,
                            valueOrValues: values.filter((_, i) => i !== fieldIndex)
                        })
                    }
                >
                    {msg("remove")}
                </Button>
            )}
            {hasAdd && (
                <Button
                    id={`kc-add${idPostfix}`}
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700 border-blue-200 hover:border-blue-300 dark:text-blue-400 dark:hover:text-blue-300"
                    onClick={() =>
                        dispatchFormAction({
                            action: "update",
                            name: attribute.name,
                            valueOrValues: [...values, ""]
                        })
                    }
                >
                    {msg("addValue")}
                </Button>
            )}
        </div>
    );
}

function InputTagSelects(props: InputFieldByTypeProps) {
    const { attribute, dispatchFormAction, i18n, valueOrValues } = props;

    const { inputType } = (() => {
        const { inputType } = attribute.annotations;
        assert(inputType === "select-radiobuttons" || inputType === "multiselect-checkboxes");
        return { inputType: inputType === "select-radiobuttons" ? "radio" : "checkbox" };
    })();

    const options = (() => {
        walk: {
            const { inputOptionsFromValidation } = attribute.annotations;
            if (inputOptionsFromValidation === undefined) {
                break walk;
            }
            const validator = (attribute.validators as Record<string, { options?: string[] }>)[inputOptionsFromValidation];
            if (validator === undefined) {
                break walk;
            }
            if (validator.options === undefined) {
                break walk;
            }
            return validator.options;
        }
        return attribute.validators.options?.options ?? [];
    })();

    return (
        <div className="space-y-3">
            {options.map(option => (
                <div key={option} className="flex items-center space-x-3">
                    <Input
                        type={inputType}
                        id={`${attribute.name}-${option}`}
                        name={attribute.name}
                        value={option}
                        aria-invalid={props.displayableErrors.length !== 0}
                        disabled={attribute.readOnly}
                        checked={valueOrValues instanceof Array ? valueOrValues.includes(option) : valueOrValues === option}
                        className="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600"
                        onChange={event =>
                            dispatchFormAction({
                                action: "update",
                                name: attribute.name,
                                valueOrValues: (() => {
                                    const isChecked = event.target.checked;
                                    if (valueOrValues instanceof Array) {
                                        const newValues = [...valueOrValues];
                                        if (isChecked) {
                                            newValues.push(option);
                                        } else {
                                            newValues.splice(newValues.indexOf(option), 1);
                                        }
                                        return newValues;
                                    }
                                    return event.target.checked ? option : "";
                                })()
                            })
                        }
                        onBlur={() =>
                            dispatchFormAction({
                                action: "focus lost",
                                name: attribute.name,
                                fieldIndex: undefined
                            })
                        }
                    />
                    <Label
                        htmlFor={`${attribute.name}-${option}`}
                        className={cn(
                            "text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer",
                            attribute.readOnly && "opacity-50 cursor-not-allowed"
                        )}
                    >
                        {inputLabel(i18n, attribute, option)}
                    </Label>
                </div>
            ))}
        </div>
    );
}

function TextareaTag(props: InputFieldByTypeProps) {
    const { attribute, dispatchFormAction, displayableErrors, valueOrValues } = props;
    assert(typeof valueOrValues === "string");
    const value = valueOrValues;
    const hasError = displayableErrors.length > 0;

    return (
        <Textarea
            id={attribute.name}
            name={attribute.name}
            aria-invalid={hasError}
            disabled={attribute.readOnly}
            cols={attribute.annotations.inputTypeCols === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeCols}`)}
            rows={attribute.annotations.inputTypeRows === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeRows}`)}
            maxLength={attribute.annotations.inputTypeMaxlength === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeMaxlength}`)}
            value={value}
            placeholder=" "
            className={cn(
                "w-full min-h-[100px] pl-4 pt-8 pb-2 bg-white/80 dark:bg-slate-800/80",
                "border-2 border-slate-200 dark:border-slate-700 rounded-xl",
                "focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                "transition-all duration-200 placeholder-transparent resize-none",
                hasError && "border-red-300 dark:border-red-600 focus:ring-red-500"
            )}
            onChange={event =>
                dispatchFormAction({
                    action: "update",
                    name: attribute.name,
                    valueOrValues: event.target.value
                })
            }
            onBlur={() =>
                dispatchFormAction({
                    action: "focus lost",
                    name: attribute.name,
                    fieldIndex: undefined
                })
            }
        />
    );
}

function SelectTag(props: InputFieldByTypeProps) {
    const { attribute, dispatchFormAction, displayableErrors, i18n, valueOrValues } = props;
    const isMultiple = attribute.annotations.inputType === "multiselect";
    const hasError = displayableErrors.length > 0;

    return (
        <select
            id={attribute.name}
            name={attribute.name}
            className={cn(
                "w-full h-14 pl-4 pt-6 pb-2 bg-white/80 dark:bg-slate-800/80",
                "border-2 border-slate-200 dark:border-slate-700 rounded-xl",
                "focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                "transition-all duration-200",
                hasError && "border-red-300 dark:border-red-600 focus:ring-red-500"
            )}
            aria-invalid={hasError}
            disabled={attribute.readOnly}
            multiple={isMultiple}
            size={attribute.annotations.inputTypeSize === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeSize}`)}
            value={valueOrValues}
            onChange={event =>
                dispatchFormAction({
                    action: "update",
                    name: attribute.name,
                    valueOrValues: (() => {
                        if (isMultiple) {
                            return Array.from(event.target.selectedOptions).map(option => option.value as string);
                        }
                        return event.target.value;
                    })()
                })
            }
            onBlur={() =>
                dispatchFormAction({
                    action: "focus lost",
                    name: attribute.name,
                    fieldIndex: undefined
                })
            }
        >
            {!isMultiple && <option value=""></option>}
            {(() => {
                const options = (() => {
                    walk: {
                        const { inputOptionsFromValidation } = attribute.annotations;
                        if (inputOptionsFromValidation === undefined) {
                            break walk;
                        }
                        assert(typeof inputOptionsFromValidation === "string");
                        const validator = (attribute.validators as Record<string, { options?: string[] }>)[inputOptionsFromValidation];
                        if (validator === undefined) {
                            break walk;
                        }
                        if (validator.options === undefined) {
                            break walk;
                        }
                        return validator.options;
                    }
                    return attribute.validators.options?.options ?? [];
                })();

                return options.map(option => (
                    <option key={option} value={option}>
                        {inputLabel(i18n, attribute, option)}
                    </option>
                ));
            })()}
        </select>
    );
}

function inputLabel(i18n: I18n, attribute: Attribute, option: string) {
    const { advancedMsg } = i18n;

    if (attribute.annotations.inputOptionLabels !== undefined) {
        const { inputOptionLabels } = attribute.annotations;
        return advancedMsg(inputOptionLabels[option] ?? option);
    }

    if (attribute.annotations.inputOptionLabelsI18nPrefix !== undefined) {
        return advancedMsg(`${attribute.annotations.inputOptionLabelsI18nPrefix}.${option}`);
    }

    return option;
}