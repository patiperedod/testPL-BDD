Feature: login

  Scenario: login with valid credential in the soucedemo site
    Given I open Souce Demo
    When I type user name "standard_user" and password "secret_sauce"
    Then I should see "Products" title is displayed

  Scenario: login with valid credential in the soucedemo site with enter
    Given I open Souce Demo
    When I type user name "standard_user" and password "secret_sauce" and enter 
    Then I should see "Products" title is displayed

  Scenario: error message is displayed when credential are inavalid 
    Given I open Souce Demo
    When I type user name "standard_use" and password "secret_sauce" invalid credentials
    Then I should see "Epic sadface: Username and password do not match any user in this service" message is displayed

  Scenario: Select Sauce Labs Bike Light item
    Given I open Souce Demo
    When I type user name "standard_user" and password "secret_sauce"
    And I select the item "Sauce Labs Bike Light"
    Then I should see the item detail page for "Sauce Labs Bike Light"

 Scenario: Filter products by Name Z to A
    Given I open Souce Demo
    When I type user name "standard_user" and password "secret_sauce" 
    And I filter products by "Name (Z to A)"
    Then products should be displayed in descending alphabetical order

Scenario: Filter products by Price low to high
    Given I open Souce Demo
    When I type user name "standard_user" and password "secret_sauce"
    And I filter products by "Price (low to high)"
    Then products should be displayed from lowest to highest price

Scenario: Filter products by Price high to low
    Given I open Souce Demo
    When I type user name "standard_user" and password "secret_sauce" 
    And I filter products by "Price (high to low)"
    Then products should be displayed from highest to lowest price