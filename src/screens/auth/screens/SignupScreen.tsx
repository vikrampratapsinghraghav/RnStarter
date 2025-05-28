import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, Button } from '@components/common';
import { useTheme } from '@theme/ThemeContext';
import { useTranslation } from '@localization/useTranslation';
import { AuthStackParamList, SignupFormData, signupSchema } from '../types';
import { FormInput } from '@components/common/FormInput';
import { useAuth } from '../context/AuthContext';

type SignupScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Signup'>;

export const SignupScreen = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation<SignupScreenNavigationProp>();
  const { signup, isLoading } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      await signup(data);
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: 'auth.signup.error.general',
      });
    }
  };

  const getErrorMessage = (message: string | undefined) => {
    if (!message) return undefined;
    try {
      return t(message);
    } catch {
      return message;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background.default }]}>
      <Text
        variant="h1"
        style={[styles.title, { color: theme.text.primary }]}>
        {t('auth.signup.title')}
      </Text>

      <FormInput
        control={control}
        name="name"
        label={t('auth.signup.name')}
        placeholder={t('auth.signup.namePlaceholder')}
        error={getErrorMessage(errors.name?.message)}
      />

      <FormInput
        control={control}
        name="email"
        label={t('auth.signup.email')}
        placeholder={t('auth.signup.emailPlaceholder')}
        keyboardType="email-address"
        autoCapitalize="none"
        error={getErrorMessage(errors.email?.message)}
      />

      <FormInput
        control={control}
        name="password"
        label={t('auth.signup.password')}
        placeholder={t('auth.signup.passwordPlaceholder')}
        secureTextEntry
        error={getErrorMessage(errors.password?.message)}
      />

      <FormInput
        control={control}
        name="confirmPassword"
        label={t('auth.signup.confirmPassword')}
        placeholder={t('auth.signup.confirmPasswordPlaceholder')}
        secureTextEntry
        error={getErrorMessage(errors.confirmPassword?.message)}
      />

      {errors.root && (
        <Text
          variant="caption"
          style={[styles.errorText, { color: theme.error.main }]}>
          {getErrorMessage(errors.root.message)}
        </Text>
      )}

      <Button
        title={t('auth.signup.submit')}
        onPress={handleSubmit(onSubmit)}
        loading={isLoading}
        variant="primary"
        style={styles.submitButton}
      />

      <View style={styles.footer}>
        <Text
          variant="body2"
          style={{ color: theme.text.secondary }}>
          {t('auth.signup.haveAccount')}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text
            variant="body2"
            style={[styles.loginLink, { color: theme.primary.main }]}>
            {t('auth.signup.login')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    marginBottom: 32,
    textAlign: 'center',
  },
  submitButton: {
    marginTop: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  loginLink: {
    marginLeft: 4,
    fontWeight: '600',
  },
  errorText: {
    textAlign: 'center',
    marginBottom: 16,
  },
}); 