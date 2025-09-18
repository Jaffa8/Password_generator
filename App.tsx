import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';

//importing yup
import * as yup from 'yup';
// importing formik
import {Formik} from 'formik';
//importing bouncy checkbox
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const PasswordSchema = yup.object().shape({
  passwordLength: yup
    .number()
    .min(4, 'Minimum of 4 length')
    .max(20, 'Max of 20 length')
    .required('Password length is required'),
});

export default function App() {
  const [password, setPassword] = useState('');
  const [isPassGenerated, setIsPassGenerated] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePasswordString = (passwordLength: number) => {
    let charracterList = '';
    let upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    let numberChars = '0123456789';
    let symbolChars = '!@#$%^&*()_+';
    if (upperCase) {
      charracterList += upperCaseChars;
    }
    if (lowerCase) {
      charracterList += lowerCaseChars;
    }
    if (numbers) {
      charracterList += numberChars;
    }
    if (symbols) {
      charracterList += symbolChars;
    }
    const passwordResult = createPassword(charracterList, passwordLength);

    setPassword(passwordResult); // setting the password
    setIsPassGenerated(true); // setting the password generated to true
  };

  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return result;
  };

  const resetPassword = () => {
    // resetting everything to the original state
    setPassword('');
    setIsPassGenerated(false);
    setLowerCase(false);
    setUpperCase(false);
    setNumbers(false);
    setSymbols(false);
  };

  return (
    <ImageBackground
      source={require('./assets/bgi6.jpg')}
      style={{width: '100%', height: '100%'}}>
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <SafeAreaView style={styles.appContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Password Generator</Text>
          </View>
          <Formik
            initialValues={{passwordLength: ''}}
            validationSchema={PasswordSchema}
            onSubmit={values => {
              generatePasswordString(Number(values.passwordLength)); // actually the values give us strings so we need to convert it to number as in our generatePasswordString function we are expecting a number
            }}>
            {({
              values,
              errors,
              isValid,
              handleChange,
              touched,
              handleSubmit,
              /* and other goodies */
            }) => (
              <>
                {/* this is for taking the pasword wali cheez */}

                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.heading}>Password Length</Text>

                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>
                        {errors.passwordLength}
                      </Text>
                    )}
                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    value={values.passwordLength}
                    onChangeText={text => handleChange('passwordLength')(text)}
                    placeholder="Ex. 8"
                    keyboardType="numeric"
                  />
                </View>
                {/* this is for having the lowerCase */}
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.heading}>
                      Include LowerCase Letters
                    </Text>
                  </View>
                  <View style={styles.added}>
                    <BouncyCheckbox
                      disableText={true}
                      isChecked={lowerCase}
                      onPress={() => setLowerCase(!lowerCase)}
                      fillColor="#192A56"
                    />
                  </View>
                </View>
                {/* this is for having the upperCase */}
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.heading}>
                      Include UpperCase Letters
                    </Text>
                  </View>
                  <View style={styles.added}>
                    <BouncyCheckbox
                      disableText={true}
                      isChecked={upperCase}
                      onPress={() => setUpperCase(!upperCase)}
                      fillColor="#BA2F16"
                    />
                  </View>
                </View>
                {/* this is for having the numbers */}
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.heading}>Include Numbers</Text>
                  </View>
                  <View style={styles.added}>
                    <BouncyCheckbox
                      disableText={true}
                      isChecked={numbers}
                      onPress={() => setNumbers(!numbers)}
                      fillColor="#EA7773"
                    />
                  </View>
                </View>
                {/* this is for the symbols */}
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.heading}>Include Symbols</Text>
                  </View>
                  <View style={styles.added}>
                    <BouncyCheckbox
                      disableText={true}
                      isChecked={symbols}
                      onPress={() => setSymbols(!symbols)}
                      fillColor="#FAD02E"
                    />
                  </View>
                </View>

                <View style={styles.formActions}>
                  <TouchableOpacity
                    disabled={
                      !isValid
                    } /* this means that the geberate button will not be active until and unless it has been validated by the yup isVlaid object that further validates it from yup schema}*/
                    style={styles.primaryBtn}
                    onPress={() => handleSubmit()}>
                    <Text style={styles.primaryBtnTxt}>Generate</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => {
                      resetPassword();
                    }}>
                    <Text style={styles.secondaryBtnTxt}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>

          {isPassGenerated ? (
            <View style={[styles.card, styles.cardElevated]}>
              <Text style={styles.subTitle}>Result: </Text>
              <Text style={styles.description}>Long Press to Copy </Text>
              <Text selectable={true} style={styles.generatedPassword}>
                {password}{' '}
              </Text>
            </View>
          ) : null}
        </SafeAreaView>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    backgroundColor: '#F5BCBA',
    fontSize: 32,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    borderRadius: 8,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
    color: 'black',
  },
  description: {
    color: 'black',
    marginBottom: 8,
  },
  heading: {
    fontSize: 18,
    color: 'black',
    fontWeight: '600',
    marginLeft: 8,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
    marginRight: 16,
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
    marginTop: 12,
  },
  cardElevated: {
    backgroundColor: '#F5BCBA',
    elevation: 1,
    shadowOffset: {
      width: 250,
      height: 350,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color: '#000',
  },
  added: {
    marginRight: 60,
  },
});
