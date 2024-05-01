# Explanation of the End points:

## 1. Login
`POST` `API/***/validate_login`
This endpoint recieves:
- `email`
- `password`

Returns:
- Cookie R_Token, this is the refresh token
- Cookie A_Token, this is the access token
<pre>
 JSON {
    name, &nbsp // Name of the user
    role  // Role of the user
}
</pre>
<br>

## 2. Register
`POST` `API/***/register`
This endpoint recieves:
- The register form data

Checks that the email and phone number are not already in use,
and just add the user to the database.

<br>

## 3. New Token
`POST` `API/***/new_token`
This endpoint recieves:
- Cookie R_Token

Returns:
- Cookie A_Token, this is the access token
- Cookie R_Token, this is the refresh token

<br>

## Explanation of the Token contents
The refresh token contains:
- Database Id
- Role

The access token contains:
- Database Id
- Role
- Email