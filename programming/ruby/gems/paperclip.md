# Official Documentation

## Quick Start

> models

    class User < ActiveRecord::Base
      has_attached_file :avatar, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
      validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/
    end

> Migrations

# Railscasts 134

We want a button where we can upload an image as an attachment to this product. We will use the paperclip plugin.

Set multipart to true.
