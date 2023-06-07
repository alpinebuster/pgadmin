from email_validator import validate_email as email_validate, \
    EmailNotValidError
import config


def validate_email(email):
    try:
        # Validate.
        valid = email_validate(
            email, check_deliverability=config.CHECK_EMAIL_DELIVERABILITY)

        # Update with the normalized form.
        email = valid.email
        return True
    except EmailNotValidError as e:
        # email is not valid, exception message is human-readable
        print(str(e))
        return False
