import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { splitTheWordIntoSyllables } from '@ukie-app/uk-lang-helpers';

class App extends Component {
  constructor() {
    super()

    this.state = {
      wordWithSyllables: "",
      inputError: false
    }
  }

  handleWord = (word) => {
    let wordWithSyllables = splitTheWordIntoSyllables(word)

    this.setState({
      wordWithSyllables: wordWithSyllables
    })
  }

  validateInput = (input) => {
    const errors = {}
    if (!input.word) {
      errors.word = 'Введіть слово для поділу на склади'
      this.setState({
        inputError: true
      })
    }
    else if (input.word) {
      const ukrAlphabet = ["а", "е", "є", "и", "і", "ї", "о", "у", "ю",
        "я", "б", "в", "г", "ґ", "д", "ж", "з", "й", "к", "л", "м", "н",
        "п", "р", "с", "т", "ф", "х", "ц", "ч", "ш", "щ", "ь"]
      
      for (let char of input.word) {
        if (!ukrAlphabet.includes(char)) {
          errors.word = 'Цей сайт підтримує поділ тільки українських слів. Введіть українські літери!'
          this.setState({
            inputError: true
          })
          break
        }
        else {
          this.setState({
            inputError: false
          })
        }
      }
    }
      
    return errors
  }

  render() {

    return (
      <div className="App">
        <div className="content">
          
          <h3>Введіть слово</h3>
          <Formik
            initialValues={{ word: '' }}
            validate={values => this.validateInput(values)}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                this.handleWord(values.word)
                setSubmitting(false)
              }, 100);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  type="word"
                  name="word"
                  className={
                    this.state.inputError
                      ? "input-error"
                      : ""
                  }
                />
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={
                    this.state.inputError
                      ? "btn-green btn-error"
                      : "btn-green"
                  }
                >
                  Поділити на склади!
                </button>
                <ErrorMessage name="word" component="p" style={{ fontSize: '1em', padding: '0.5em'}} />
              </Form>
            )}
          </Formik>
          
          {
            this.state.wordWithSyllables &&
            <div className="search-result">
              <h4>Ваше слово поділене на склади:</h4>
              <p>{this.state.wordWithSyllables}</p>
            </div>
          }
        </div>

        <div className="footer">
          <p>Цей сайт розробила <a href="https://medvetska.com">Медвецька Ґабріела</a></p>
          <p>Як саме відбувається поділ слів на склади можна подивитися на <a href="https://github.com/ukie-app/uk-lang-helpers">ҐітХабі</a></p>
          <p>&copy; 2020 Gabriela Medvetska</p>
        </div>
      </div>
    );
  }
}

export default App;
