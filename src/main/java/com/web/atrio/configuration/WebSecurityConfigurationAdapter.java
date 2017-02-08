package com.web.atrio.configuration;

import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import com.web.atrio.models.routes.Route;

@EnableWebSecurity
@Configuration
public class WebSecurityConfigurationAdapter extends WebSecurityConfigurerAdapter {
	private static CSRFCustomRepository csrfRepository = new CSRFCustomRepository();

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors();
		List<Route> routes = ConfigurationAccessor.getRoutes();
		for (Route route : routes) {
			for (String role : route.getPermissions()) {
				if (!role.equals("NONE")) {
					http.authorizeRequests().antMatchers(route.getMethod(), route.getUrl()).hasAuthority(role).and()
							.csrf().csrfTokenRepository(csrfRepository);
				}
			}
		}
		// Set up basic auth to obtain token
		http.httpBasic().and().authorizeRequests().antMatchers(HttpMethod.GET, "/token").authenticated();

		// Require csrf token authentication for anything else
		http.csrf().csrfTokenRepository(csrfRepository);
	}

	@Override
	public void configure(WebSecurity web) throws Exception {
		List<Route> routes = ConfigurationAccessor.getRoutes();
		for (Route route : routes) {
			for (String role : route.getPermissions()) {
				if (role.equals("NONE")) {
					// Remove any requirements for routes with no roles (public)
					web.ignoring().antMatchers(route.getMethod(), route.getUrl());
				}
			}
		}
	}
}