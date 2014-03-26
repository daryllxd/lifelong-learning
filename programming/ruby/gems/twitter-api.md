# Codecademy Twitter API

    require 'open-uri'
    kittens = open("http://placekitten.com")

## What a request looks like

    # POST codeecademyh/learn-http HTTP/1.1
    # Host www.codecademy.com
    # Content-Type text/html; charset=UTF-8

    # Name=Eric&Age=26

Many APIs require and API key, which grants you access to a particular API. Some APIs require authentication using a protocol called OAuth.

## Status Codes

- 1xx: "Got it! I'm working on the request"
- 2xx: Server sends it when it's successfully responding to your requeset
- 3xx: "I can do what you want, but I have to do something else first."
- 4xx: You probably made a mistake
- 5xx: Server goofed up.

## HTTP Response

- Contains the three-digit HTTP status code
- A header, which includes further information about the server and its response
- body, which contains the text of the response.

Reading XML: Use `require rexml/document` 

Parsing JSON: `require json; JSON.parse(doc)`

# Introduction to the Twitter API

1. Fill in Twitter API key, etc. from `dev.twitter.com/apps`
2. Make the request, the print the shit.

## Samplerz
        
    require 'rubygems'
    require 'oauth'
    require 'json'

    # Now you will fetch /1.1/statuses/user_timeline.json,
    # returns a list of public Tweets from the specified
    # account.
    baseurl = "https://api.twitter.com"
    path    = "/1.1/statuses/user_timeline.json"
    query   = URI.encode_www_form(
        "screen_name" => "twitterapi",
        "count" => 10,
    )
    address = URI("#{baseurl}#{path}?#{query}")
    request = Net::HTTP::Get.new address.request_uri

    # Print data about a list of Tweets
    def print_timeline(tweets)
        tweets.each do |tweet|
            puts tweet['text']     
    end

    end

    # Set up HTTP.
    http             = Net::HTTP.new address.host, address.port
    http.use_ssl     = true
    http.verify_mode = OpenSSL::SSL::VERIFY_PEER

    # If you entered your credentials in the first
    # exercise, no need to enter them again here. The
    # ||= operator will only assign these values if
    # they are not already set.
    consumer_key ||= OAuth::Consumer.new "ENTER IN EXERCISE 1", ""
    access_token ||= OAuth::Token.new "ENTER IN EXERCISE 1", ""

    # Issue the request.
    request.oauth! http, consumer_key, access_token
    http.start
    response = http.request request

    # Parse and print the Tweet if the response code was 200
    tweets = nil
    if response.code == '200' then
      tweets = JSON.parse(response.body)
      print_timeline(tweets)
    end
    nil


