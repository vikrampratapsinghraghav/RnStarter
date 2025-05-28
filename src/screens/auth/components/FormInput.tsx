import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Text } from '../../../components/common';
import { useTheme } from '../../../theme/ThemeContext';

interface FormInputProps<T extends FieldValues> extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  error?: string;
}

export const FormInput = <T extends FieldValues>({
  control,
  name,
  label,
  error,
  style,
  ...props
}: FormInputProps<T>) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Text
        variant="body2"
        style={[styles.label, { color: error ? theme.error.main : theme.text.primary }]}>
        {label}
      </Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.background.default,
                color: theme.text.primary,
                borderColor: error ? theme.error.main : theme.text.secondary,
              },
              style,
            ]}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholderTextColor={theme.text.secondary}
            {...props}
          />
        )}
      />
      {error && (
        <Text variant="caption" style={[styles.error, { color: theme.error.main }]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 4,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  error: {
    marginTop: 4,
  },
}); 