"""empty message

<<<<<<<< HEAD:migrations/versions/29e0a8c2dc08_.py
Revision ID: 29e0a8c2dc08
Revises: 
Create Date: 2025-03-08 15:12:16.129370
========
Revision ID: d5c393ed765a
Revises: 
Create Date: 2025-03-11 15:43:31.962858
>>>>>>>> 0071f6e6af8bac4f9d92a657aec084b3fe885a15:migrations/versions/d5c393ed765a_.py

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
<<<<<<<< HEAD:migrations/versions/29e0a8c2dc08_.py
revision = '29e0a8c2dc08'
========
revision = 'd5c393ed765a'
>>>>>>>> 0071f6e6af8bac4f9d92a657aec084b3fe885a15:migrations/versions/d5c393ed765a_.py
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('last_name', sa.String(length=100), nullable=False),
    sa.Column('email', sa.String(length=100), nullable=False),
    sa.Column('password', sa.String(length=25), nullable=False),
    sa.Column('telefono', sa.String(length=20), nullable=False),
    sa.Column('is_admin', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user')
    # ### end Alembic commands ###
