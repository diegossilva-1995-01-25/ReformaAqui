import base64
import bcrypt
import os

from cryptography.fernet import Fernet
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC

def py_digest(pwd):
	return bcrypt.hashpw( pwd.encode('utf8'), bcrypt.gensalt(12) )

def py_digest_chk(pwd, hsh):
	return bcrypt.hashpw( pwd.encode('utf8'), hsh.encode('utf8') ) == hsh

def py_encrypt(msg, pwd):
	salt = os.urandom(16)
	token_a = base64.urlsafe_b64encode(salt)
	kdf = PBKDF2HMAC(
		algorithm=hashes.SHA256(),
		length=32,
		salt=salt,
		iterations=100000,
		backend=default_backend()
	)
	key = base64.urlsafe_b64encode( kdf.derive( pwd.encode('utf8') ) )
	f = Fernet(key)
	token_b = f.encrypt( msg.encode('utf8') )
	return '|'.join([ token_a, token_b ])

def py_decrypt(token, pwd):
	token_a, token_b = token.split('|')
	salt = base64.urlsafe_b64decode( token_a.encode('ascii') )
	kdf = PBKDF2HMAC(
		algorithm=hashes.SHA256(),
		length=32,
		salt=salt,
		iterations=100000,
		backend=default_backend()
	)
	key = base64.urlsafe_b64encode( kdf.derive( pwd.encode('utf8') ) )
	f = Fernet(key)
	return f.decrypt( token_b.encode('utf8') )
