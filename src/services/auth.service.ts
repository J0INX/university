import { Injectable } from '@angular/core';
import { Auth, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, User, UserCredential } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly auth: Auth;
  private readonly apiUrl =
    'https://europe-west1-ceo-university.cloudfunctions.net/createUser';

  constructor() {
    this.auth = getAuth();
  }
  createUser(email: string, password: string): Promise<any> {
    const requestBody = { email, password };

    return fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((error) => {
            throw new Error(`HTTP error! Status: ${response.status}`);
          });
        }
        return response.text();
      })
      .then((data) => {
        console.log('Respuesta del servidor:', data);
        alert(data);
      })

      .catch((error) => {
        console.error('Error al crear usuario:', error.message);
        throw error;
      });
  }

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }
  onAuthStateChanged(callback: (user: User | null) => void): void {
    onAuthStateChanged(this.auth, callback);
  }
  isAuthenticated(): boolean {
    return !!this.auth.currentUser;
  }
}
