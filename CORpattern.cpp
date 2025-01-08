#include <iostream>
#include <string>
#include <regex> //Per la validazione dell'email con espressioni regolari
using namespace std;

//Classe base per il controllo, fornisce la struttura generale per i controlli
class ControlloBase {
protected:
    ControlloBase* prossimo; //Puntatore al prossimo controllo nella catena, se non ci sono errori passa al controllo successivo

public:
    ControlloBase() : prossimo(nullptr) {} //costruttore che inizializza prossimo a nullptr

    //metodo che collega un nuovo controllo come successivo nella catena
    void setProssimo(ControlloBase* prossimoControllo) {
        prossimo = prossimoControllo;
    }

    //Metodo virtuale per eseguire il controllo sovrascritto dalle altre classi
    virtual bool valida(const string& email, const string& password, const string& confermaPassword, const string& nome) {
        if (prossimo) {
            return prossimo->valida(email, password, confermaPassword, nome);
        }
        return true; // Se non c'è più nessun controllo, è tutto valido
    }

    virtual ~ControlloBase() {}
};

// Controllo per i campi obbligatori
class ControlloCampiObbligatori : public ControlloBase {
public:
    bool valida(const string& email, const string& password, const string& confermaPassword, const string& nome) override {
        if (email.empty() || password.empty() || nome.empty()) {
            cout << "Errore: Devi compilare tutti i campi obbligatori.\n";
            return false;
        }
        return ControlloBase::valida(email, password, confermaPassword, nome);
    }
};

// Controllo per la validità dell'email
class ControlloEmail : public ControlloBase {
public:
    bool valida(const string& email, const string& password, const string& confermaPassword, const string& nome) override {
        regex formatoEmail("[\\w.%+-]+@[\\w.-]+\\.[a-zA-Z]{2,}");
        if (!regex_match(email, formatoEmail)) {
            cout << "Errore: L'indirizzo email non è valido.\n";
            return false;
        }
        return ControlloBase::valida(email, password, confermaPassword, nome);
    }
};

// Controllo per la complessità della password
class ControlloPassword : public ControlloBase {
public:
    bool valida(const string& email, const string& password, const string& confermaPassword, const string& nome) override {
        if (password.length() < 8) {
            cout << "Errore: La password deve essere lunga almeno 8 caratteri.\n";
            return false;
        }
        return ControlloBase::valida(email, password, confermaPassword, nome);
    }
};

// Controllo per la corrispondenza delle password
class ControlloConfermaPassword : public ControlloBase {
public:
    bool valida(const string& email, const string& password, const string& confermaPassword, const string& nome) override {
        if (password != confermaPassword) {
            cout << "Errore: Le due password non corrispondono.\n";
            return false;
        }
        return ControlloBase::valida(email, password, confermaPassword, nome);
    }
};

int main() {
    // Creazione degli oggetti di controllo
    ControlloCampiObbligatori controlloCampi;
    ControlloEmail controlloEmail;
    ControlloPassword controlloPassword;
    ControlloConfermaPassword controlloConfermaPassword;

    // Configurazione della catena di controllo
    controlloCampi.setProssimo(&controlloEmail);
    controlloEmail.setProssimo(&controlloPassword);
    controlloPassword.setProssimo(&controlloConfermaPassword);

    // Dati del modulo compilato dall'utente
    string email = "utente@example.com";         // Email valida
    string password = "password123";            // Password valida
    string confermaPassword = "password123";    // Conferma corretta
    string nome = "Mario Rossi";                // Nome valido

    // Inizio della validazione
    if (controlloCampi.valida(email, password, confermaPassword, nome)) {
        cout << "Tutti i dati sono validi. Modulo accettato.\n";
    } else {
        cout << "Ci sono errori nel modulo. Correggi e riprova.\n";
    }

    return 0;
}