import React from 'react'
import './App.css'
import { Dashboard } from './Dashboard'
import { Amplify } from 'aws-amplify'
import {
  Authenticator,
  useTheme,
  Heading,
  Text
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';


/** Configure user pool */
Amplify.configure({
  Auth: {
    region: "us-west-1",
    userPoolId: import.meta.env.VITE_USER_POOL_ID,
    userPoolWebClientId: import.meta.env.VITE_CLIENT_ID
  }
})

/** Customize Authenticator to hide Sign Up */
const formFields = {
  confirmVerifyUser: {
    confirmation_code: {
      label: 'New Label',
      placeholder: 'Enter your Confirmation Code:',
      isRequired: false,
    },
  },
};

const components = {
  VerifyUser: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },

  ConfirmVerifyUser: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
};

const App: React.FC = () => {


  return (
    <Authenticator
      formFields={formFields}
      components={components}
      hideSignUp={true}
    >
      {({/*signOut,*/ user}) => (
        <Dashboard username={user.username}/>
      )}
    </Authenticator>
  );
}

export default App;