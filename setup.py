from setuptools import setup, find_packages

setup(
    name='flask-visualization-app',
    version='1.0',
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        'Flask',
        'matplotlib',
        'seaborn',
        'pandas',
        'fpdf'
    ],
    entry_points={
        'console_scripts': [
            'run_app=run:app',
        ],
    },
)
