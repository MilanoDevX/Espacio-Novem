
import click
from api.models import db, User
from werkzeug.security import generate_password_hash, check_password_hash

"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration 
with youy database, for example: Import the price of bitcoin every night as 12am
"""
def setup_commands(app):
    
    """ 
    This is an example command "insert-test-users" that you can run from the command line
    by typing: $ flask insert-test-users 5
    Note: 5 is the number of users to add
    """
    @app.cli.command("insert-test-users") # name of our command
    @click.argument("count") # argument of out command
    def insert_test_users(count):
        print("Creating test users")
        for x in range(1, int(count) + 1):
            user = User()
            user.email = "test_user" + str(x) + "@test.com"
            user.password = "123456"
            user.is_active = True
            db.session.add(user)
            db.session.commit()
            print("User: ", user.email, " created.")

        print("All test users created")

    # @app.cli.command("insert-users")
    # def insert_users():
    #     new_admin = User(
    #     name = "Espacio",
    #     last_name = "Novem",
    #     email = "espacionovem@gmail.com",
    #     password = "123456789",
    #     telefono = "123456789",
    #     is_admin = True,
    #     )
    #     db.session.add(new_admin)
    #     db.session.commit()
    #     print("Admin user created")

        # new_admin2 = User(
        # name = "Lucía",
        # last_name = "Eguren",
        # email = "@gmail.com",
        # password = "123456789",
        # telefono = "123456789",
        # is_admin = True,
        # )
        # db.session.add(new_admin2)
        # db.session.commit()
        # print("Admin user created")
        
        # new_admin2 = User(
        # name = "Admin",
        # last_name = "Admin",
        # email = "trabajosdeveloper2025@gmail.com",
        # password = "123456789",
        # telefono = "123456789",
        # is_admin = True,
        # )
        # db.session.add(new_admin2)
        # db.session.commit()
        # print("Admin user created")
        
