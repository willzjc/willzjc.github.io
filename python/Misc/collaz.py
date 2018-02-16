

# This python script generates a graph that shows 20 levels of the Collatz Conjecture.

level = [1]  # The root of the tree contains only "1"
results = {}  # This will hold the relationships for the graph

# Loop 20 times
for c in range(20):
    newlevel = set()  # This will be the set of numbers in the level above us
    for x in level:  # We now loop through each number in our current level

        # There will only sometimes be an odd multiple of 3 (plus one) above us
        # When (x-1) mod 3 is 0, x is an even number half the time
        # So we check against (x-4) mod 6 because we don't want to find evens
        odd = (x - 1) / 3 if not (x - 4) % 6 else 0
        if odd > 1:  # We don't want 1 (the root) or 0 (no odd found)
            newlevel.add(odd)  # Put this into the next level
            results[odd] = x  # Add a relationship to the graph

        newlevel.add(x * 2);  # There will always be an even number above us
        results[x * 2] = x  # Add a relationship to the graph

    # Finally, advance to the next level
    level = newlevel

# Technically, 1 is odd so 1*3+1 = 4. If included though, this tends to make 2 and 1 overlap on the graph, which is ugly.
# Uncomment to include this relationship:
# results[1] = 4;

# Now we write the graph out to a file in dot format so that graphviz can read it
f = open('collatz.dot', 'w')
# For aesthetic reasons we set 8 as the centre node instead of 1
f.write('digraph G {\n    size="16,16";\n    root=8;\n    splines=true;\n')
for x in results:
    f.write("    %d -> %d;\n" % (x, results[x]))
f.write('}\n')
f.close()
print "Generated %d nodes" % len(results)