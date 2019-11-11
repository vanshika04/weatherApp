/*
---
title: "what?"
description: "SRP"
preview_image: /images/blog/
section: blog
author: john doe
date: 2018-01-08 10:00 utc
tags: development
published: true
---

THE SINGLE

READMORE

![SRP](/images/blog/2018)

##History

term wasss


OUTPUT:

"{date":"2018-01-08 10",
"author":"john doe",
"description":"SRP",
"published":"true",
"short-content":"THE SINGLE",
"title":"what?",
"content":"![SRP](/images/blog/2018)",
"tags":"development}",
*/


package practice;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class pract {
	
	public static String getDoubleQ(String s){
		
		String condString ;
		if((s.charAt(0) =='"' && s.charAt(s.length() -1) == '"' ))  //true cond
			condString = s;
		else 
			condString = "\"" + s + "\"";
 		return  condString;
	}
	public static String makeJsonLine(String s){
		
		String[] sString = s.split("=");
		String jsonString =  new String(); // = new StringBuilder("");
		if(sString.length == 2 ){
			
			jsonString = getDoubleQ(sString[0]) + ":" + getDoubleQ(sString[1]);
			
				//jsonString.append(getDoubleQ(sString[0])); //key
			//	jsonString.append(getDoubleQ(sString[1])); //value
		}
		
	    return jsonString;
	}
	
	public static void main(String[] args)throws Exception 
	  {	
	  List contents = new ArrayList();
	  File file = new File("C:\\Users\\xbbnhmp\\Desktop\\New folder\\Blog.txt"); 	  
	  BufferedReader br = new BufferedReader(new FileReader(file)); 	  
	  String st; 
	  
	  Map map = new HashMap<String,String>();
	  List negateWords = new ArrayList();
	  negateWords.add("preview_image");
	  negateWords.add("section");
	  
	
	  while ((st = br.readLine()) != null) {
		  String[]values = st.split("/n");
		  for(String value:values){
			  String[] vall = value.split(":");  
			 if(vall.length>1){
				if(!(negateWords.contains(vall[0])))
					if(vall[1].trim().contains(",")){
						String[] tags = vall[1].split(",");
						
						
						map.put(vall[0].trim(), Arrays.toString(tags));
					}
					else{
					map.put(vall[0].trim(), vall[1].trim());
					}
			  }			
			 
		  }
		 
		  for(String content: values){
			  contents.add(content);
		  }		 
		 
		  
	  }
	  map.put("short-content", contents.get(11));
	  map.put("content",contents.get(15));	
	  String[] jsonArray = null;
	  StringBuilder jsonString = new StringBuilder("");
	 // jsonString.append("{");	 
	  
	  jsonArray = map.toString().split(", "); //will be improved
	  
	  for(String line: jsonArray)
	  {
		  jsonString.append(makeJsonLine(line));
		  jsonString.append(",");
		  jsonString.append("\n");
		  	
	  }	  
	  //jsonString.append("}");	  
	  System.out.println(jsonString.toString());
	 
}}
