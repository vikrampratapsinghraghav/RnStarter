import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text } from '../../../components/common';
import { useTheme } from '../../../theme/ThemeContext';
import { useTranslation } from '../../../localization/useTranslation';
import { AuthStackParamList, LoginFormData, loginSchema } from '../types';
import { FormInput } from '../components/FormInput';
import { Button } from '../../../components/common';
import { useAuth } from '../context/AuthContext';

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export const LoginScreen = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { login, isLoading } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: 'auth.login.error.general',
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
        {t('auth.login.title')}
      </Text>

      <FormInput
        control={control}
        name="email"
        label={t('auth.login.email')}
        placeholder={t('auth.login.emailPlaceholder')}
        keyboardType="email-address"
        autoCapitalize="none"
        error={getErrorMessage(errors.email?.message)}
      />

      <FormInput
        control={control}
        name="password"
        label={t('auth.login.password')}
        placeholder={t('auth.login.passwordPlaceholder')}
        secureTextEntry
        error={getErrorMessage(errors.password?.message)}
      />

      {errors.root && (
        <Text
          variant="caption"
          style={[styles.errorText, { color: theme.error.main }]}>
          {getErrorMessage(errors.root.message)}
        </Text>
      )}

      <Button
        title={t('auth.login.submit')}
        onPress={handleSubmit(onSubmit)}
        loading={isLoading}
        variant="primary"
        style={styles.submitButton}
      />

      <View style={styles.footer}>
        <Text
          variant="body2"
          style={{ color: theme.text.secondary }}>
          {t('auth.login.noAccount')}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text
            variant="body2"
            style={[styles.signupLink, { color: theme.primary.main }]}>
            {t('auth.login.signup')}
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
  signupLink: {
    marginLeft: 4,
    fontWeight: '600',
  },
  errorText: {
    textAlign: 'center',
    marginBottom: 16,
  },
}); 