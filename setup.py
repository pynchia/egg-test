from setuptools import find_packages, setup


# with open('README.rst') as f:
#     LONG_DESC = f.read()

setup(
    name='eggtest',
    version='0.0.1',
    url='http://example.com',
    description='Fullstack test exercise',
    # long_description=LONG_DESC,
    author='Pynchia', author_email='pyncha@gmail.com',
    license='MIT',
    classifiers=[
        'Development Status :: 3 - Alpha',
        'License :: OSI Approved :: MIT License',
        'Programming Language :: Python :: 3'],
    keywords=['eggtest', ],
    packages=find_packages(),
    include_package_data=False,
    zip_safe=False,
    entry_points="""
    [console_scripts]
    appcli = eggtest.cli:cli
    """,
    install_requires=[]
)
