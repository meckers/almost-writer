package models;

import play.data.binding.TypeBinder;

import java.lang.annotation.Annotation;
import java.lang.reflect.Type;


public class JsonObjectBinder implements TypeBinder<Vertex> {

    public Object bind(String name, Annotation[] annotations, String value, Class actualClass, Type t) throws Exception {
        System.out.println("in binder value is " + value);
        return new Vertex(55.5555, 22.222);
    }

    public Object bind(String name, Annotation[] annotations, String value, Class actualClass) throws Exception {
        System.out.println("in binder value is " + value);
        return new Vertex(55.5555, 22.222);
    }

}