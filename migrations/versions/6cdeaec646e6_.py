"""empty message

Revision ID: 6cdeaec646e6
Revises: 2441fa57c3e6
Create Date: 2021-04-24 18:31:24.601089

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6cdeaec646e6'
down_revision = '2441fa57c3e6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint(None, 'Users', ['email'])
    op.create_unique_constraint(None, 'Users', ['username'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'Users', type_='unique')
    op.drop_constraint(None, 'Users', type_='unique')
    # ### end Alembic commands ###
