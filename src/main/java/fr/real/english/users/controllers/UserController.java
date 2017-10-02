package fr.real.english.users.controllers;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import fr.real.english.configuration.AuthenticatedUsersService;
import fr.real.english.configuration.CSRFCustomRepository;
import fr.real.english.exceptions.ConflictException;
import fr.real.english.exceptions.NotFoundException;
import fr.real.english.exceptions.UnauthorizedException;
import fr.real.english.users.models.Account;
import fr.real.english.users.models.AccountForm;
import fr.real.english.users.repositories.AccountRepository;
import fr.real.english.users.utilities.UserService;

@CrossOrigin
@RestController
public class UserController {

	@Autowired
	AccountRepository accountRepository;

	@RequestMapping(value = "/api/token", method = RequestMethod.GET)
	public Map<String, Object> token(HttpServletRequest request) {
		String sessionId = request.getSession().getId();
		String username = request.getRemoteUser();
		AuthenticatedUsersService.logUser(username, sessionId);
		return Collections.singletonMap("token", CSRFCustomRepository.getTokenFromSessionId(request));
	}

	@RequestMapping(value = "/api/users/", method = RequestMethod.POST)
	public ResponseEntity<Account> createUser(@RequestBody AccountForm accountForm) throws ConflictException {
		boolean isFirst = accountRepository.count() == 0;
		Account user = new Account();
		Account dbUser = accountRepository.findByUsername(accountForm.getUsername());
		if (dbUser == null) {
			user.setEmail(accountForm.getEmail());
			user.setFirstName(accountForm.getFirstName());
			user.setLastName(accountForm.getLastName());
			user.setUserName(accountForm.getUsername());
			user.setPassword(accountForm.getPassword());
			if(isFirst){
				user.addRole("ADMIN");
				user.addRole("PROFESSOR");
			}
			accountRepository.save(user);
			return new ResponseEntity<Account>(user, HttpStatus.CREATED);
		} else {
			throw new ConflictException();
		}
	}

	@RequestMapping(value = "/api/users/{userId}", method = RequestMethod.DELETE)
	public ResponseEntity<String> deleteUser(@PathVariable(value = "userId") Long userId) {
		Account account = accountRepository.findOne(userId);
		if (account != null) {
			accountRepository.delete(account);
		}
		return new ResponseEntity<String>("User deleted", HttpStatus.OK);
	}

	@RequestMapping(value = "/api/me/edit", method = RequestMethod.PUT)
	public ResponseEntity updateProfile(@RequestBody AccountForm accountForm, HttpServletRequest request) throws UnauthorizedException {
		Account accountFromDB = accountRepository.findByUsername(accountForm.getUsername());
		Account accountFromRequest = accountRepository.findByUsername(UserService.getUser(request));
		if(accountFromDB.equals(accountFromRequest)) {
			if(accountFromRequest.getPassword() != null) {
				accountFromDB.setPassword(accountFromRequest.getPassword());
			}
			if(accountForm.getFirstName() != null) {
				accountFromDB.setFirstName(accountForm.getFirstName());
			}
			if(accountForm.getLastName() != null) {
				accountFromDB.setLastName(accountForm.getLastName());
			}
			return new ResponseEntity<Account>(accountRepository.save(accountFromDB), HttpStatus.OK);
			
		} else {
			throw new UnauthorizedException();
		}
	}

	@RequestMapping(value = "/api/users", method = RequestMethod.GET)
	public ResponseEntity<List> getUsers() {
		return new ResponseEntity<List>((List) accountRepository.findAll(), HttpStatus.OK);
	}

	@RequestMapping(value = "/api/users/{userId}", method = RequestMethod.GET)
	public ResponseEntity<Account> getUser(@PathVariable(value = "userId") Long userId) throws NotFoundException {
		Account user = accountRepository.findOne(userId);
		if (user == null) {
			throw new NotFoundException();
		}
		return new ResponseEntity<Account>(user, HttpStatus.OK);
	}

	@RequestMapping(value = "/api/me", method = RequestMethod.GET)
	public ResponseEntity<Account> getMe(HttpServletRequest request) {
		String username = AuthenticatedUsersService.getUser(request.getSession().getId());
		return new ResponseEntity<Account>(accountRepository.findByUsername(username), HttpStatus.OK);
	}
}
