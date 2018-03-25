def get_text(name):
   return "lorem ipsum, {0} dolor sit amet".format(name)

def get_text_alt(name):
    return name.upper().format(name)

def p_decorate(func):
   def func_wrapper(name):
       return "<p>{0}</p>".format(func(name))
   return func_wrapper

my_get_text = p_decorate(get_text)

# print my_get_text("John")

# <p>Outputs lorem ipsum, John dolor sit amet</p>

print get_text("get_text John")
print get_text_alt("get_text_alt gettextalt")
print '--------------------'
get_text = p_decorate(get_text)
get_text_alt = p_decorate(get_text_alt)

print get_text("get_text John")
print get_text_alt("get_text_alt gettextalt")
# print p_decorate(get_text_alt("something"))
# print p_decorate(get_text_alt("something"))

# Outputs lorem ipsum, John dolor sit amet

def passFunc(*args):
    return str(args) + '<= Passed'

print passFunc(get_text_alt)

def passFuncOut(func):
    return func('ABC') + '<= Passed'

print passFuncOut(get_text_alt)
