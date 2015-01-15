# OQeury
OQuery is a javascript framework like Jquery

As using $ in Jquery, we use "O"(Big O) like O(element)

Method of "O" are as follows with example

O(element).hide();
O(element).show();
O(element).hide();
O(element).fadeIn(time);// You can use time in milisecond or slow or fast keyword
O(element).fadeOut(time);// You can use time in milisecond or slow or fast keyword
O(element).hasClass(classname)//return true if element exist with the class or return false if element has not matching classname providdd.
O(element).addClass(classname)
O(element).removeClass()
O(element).remove() element will be removed from Dom

//O.css() method has three types of parameters
O(element).css(styleproperty) will return style property value
O(element).css(styleproperty,styleproperty) will set style with styleproperty and styleproperty
O(element).css({styleproperty1:styleproperty1,styleproperty2:styleproperty2}) will set style with styleproperty and styleproperty

//O.attr() method has three types of parameters
O(element).attr(attribute) will return attribute value
O(element).css(attributekey,attributevalue) will set attribute with attributekey and attributevalue
O(element).css({attributekey1:attributevalue2,attributekey2:attributevalue2}) will set attribute with attributekey and attributevalue

//O.html() function has no argument and one argument
O(element).html() this will returns what element contains in it as html;
O(element).html("HTML CONTENT") this will set html within the element
